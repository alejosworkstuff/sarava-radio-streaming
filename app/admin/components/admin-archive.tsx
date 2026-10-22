"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

export type AdminArchiveItem = {
  id: string;
  title: string;
  date: string;
  displayDate: string;
  thumbnail: string;
  editor: ReactNode;
};

type AdminArchiveProps = {
  title: string;
  itemLabel: string;
  itemLabelSingular: string;
  items: AdminArchiveItem[];
};

export function AdminArchive({
  title,
  itemLabel,
  itemLabelSingular,
  items,
}: AdminArchiveProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState({
    width: 0,
    height: 0,
    column: 1,
  });
  const [isClosing, setIsClosing] = useState(false);
  const [isImageRevealing, setIsImageRevealing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState("");
  const editorRef = useRef<HTMLElement>(null);
  const panelId = useId();
  const reduceMotion = useReducedMotion();
  const visibleItems = items.filter((item) => !dateFilter || item.date === dateFilter);

  const closeSelected = useCallback(() => {
    if (selectedId) setIsClosing(true);
  }, [selectedId]);

  useEffect(() => {
    if (!selectedId) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (
        !(event.target instanceof Node) ||
        !editorRef.current?.contains(event.target)
      ) {
        closeSelected();
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSelected();
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [closeSelected, selectedId]);

  const animation = reduceMotion
    ? { duration: 0 }
    : { duration: 0.42, ease: [0.65, 0, 0.35, 1] as const };
  const fadeAnimation = reduceMotion
    ? { duration: 0 }
    : { duration: 0.24, ease: "easeOut" as const };

  return (
    <section className="admin-archive">
      <button
        className="admin-archive-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => {
          if (isOpen) {
            setSelectedId(null);
            setIsClosing(false);
            setIsImageRevealing(false);
            setIsOpen(false);
            return;
          }

          setIsOpen(true);
        }}
      >
        <span>{title} ({items.length})</span>
        <span className="admin-archive-hint">
          {isOpen ? "Ocultar" : `Ver ${itemLabel.toLowerCase()}`}
        </span>
        <motion.span
          className="admin-archive-chevron"
          aria-hidden="true"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={animation}
        >
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={panelId}
            className="admin-archive-content"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={animation}
          >
            <div className="admin-archive-toolbar">
              <label
                className="admin-archive-date-button"
                title="Buscar por fecha"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <rect x="3.5" y="5" width="17" height="16" rx="2" />
                  <path d="M7.5 3v4M16.5 3v4M3.5 10h17M8 14h2m4 0h2m-8 3h2m4 0h2" />
                </svg>
                <span>{dateFilter || "Buscar por fecha"}</span>
                <input
                  className="admin-archive-date-input"
                  type="date"
                  aria-label="Filtrar por fecha"
                  value={dateFilter}
                  onChange={(event) => {
                    closeSelected();
                    setDateFilter(event.target.value);
                  }}
                />
              </label>
              {dateFilter ? (
                <button
                  className="admin-archive-clear-date"
                  type="button"
                  onClick={() => {
                    closeSelected();
                    setDateFilter("");
                  }}
                >
                  Limpiar fecha
                </button>
              ) : null}
              <span className="admin-archive-result-count">
                {visibleItems.length}{" "}
                {visibleItems.length === 1
                  ? itemLabelSingular.toLowerCase()
                  : itemLabel.toLowerCase()}
              </span>
            </div>

            {visibleItems.length ? (
              <ul className="admin-archive-grid" role="list">
                <AnimatePresence initial={false}>
                  {visibleItems.map((item) => {
                    const selected = selectedId === item.id;
                    return (
                      <li
                        className={`admin-archive-card${selected ? " is-expanded" : ""}`}
                        key={item.id}
                        style={
                          selected
                            ? ({
                                gridColumnStart: selectedSize.column,
                                "--admin-archive-thumbnail-width": `${selectedSize.width}px`,
                                "--admin-archive-thumbnail-height": `${selectedSize.height}px`,
                              } as CSSProperties)
                            : undefined
                        }
                      >
                        <AnimatePresence initial={false}>
                          {selected ? (
                            <motion.article
                              key="editor"
                              className="admin-archive-editor"
                              ref={editorRef}
                              initial={
                                reduceMotion
                                  ? false
                                  : {
                                      width: selectedSize.width,
                                      height: selectedSize.height,
                                    }
                              }
                              animate={{
                                width:
                                  isClosing || isImageRevealing
                                    ? selectedSize.width
                                    : "100%",
                                height:
                                  isClosing || isImageRevealing
                                    ? selectedSize.height
                                    : "auto",
                              }}
                              transition={animation}
                              onAnimationComplete={() => {
                                if (isClosing) {
                                  setIsClosing(false);
                                  setIsImageRevealing(true);
                                }
                              }}
                            >
                              <motion.div
                                className="admin-archive-editor-image"
                                style={{
                                  width: Math.max(0, selectedSize.width - 2),
                                  height: Math.max(0, selectedSize.height - 2),
                                }}
                                initial={false}
                                animate={{ opacity: isImageRevealing ? 1 : 0 }}
                                transition={fadeAnimation}
                                onAnimationComplete={() => {
                                  if (isImageRevealing) {
                                    setSelectedId(null);
                                    setIsImageRevealing(false);
                                  }
                                }}
                                aria-hidden="true"
                              >
                                <Image
                                  src={item.thumbnail}
                                  alt=""
                                  fill
                                  unoptimized
                                  sizes="(max-width: 600px) 44vw, (max-width: 900px) 28vw, 180px"
                                />
                                <span className="admin-archive-thumbnail-overlay">
                                  <strong>{item.title}</strong>
                                  <span>{item.displayDate}</span>
                                </span>
                              </motion.div>
                              <motion.div
                                className="admin-archive-editor-content"
                                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                                animate={{
                                  opacity: isClosing || isImageRevealing ? 0 : 1,
                                  y: isClosing || isImageRevealing ? 5 : 0,
                                }}
                                transition={fadeAnimation}
                              >
                                <div className="admin-archive-editor-heading">
                                  <h3>{item.title}</h3>
                                  <button
                                    className="admin-archive-close"
                                    type="button"
                                    onClick={closeSelected}
                                  >
                                    Volver a miniaturas
                                  </button>
                                </div>
                                {item.editor}
                              </motion.div>
                            </motion.article>
                          ) : (
                            <motion.button
                              key="thumbnail"
                              className="admin-archive-thumbnail"
                              type="button"
                              aria-expanded={false}
                              aria-label={`Editar ${item.title}, ${item.displayDate}`}
                              initial={false}
                              animate={{ opacity: 1 }}
                              exit={reduceMotion ? undefined : { opacity: 0 }}
                              transition={fadeAnimation}
                              onClick={(event) => {
                                const bounds =
                                  event.currentTarget.getBoundingClientRect();
                                const grid =
                                  event.currentTarget.closest(".admin-archive-grid");
                                const gridBounds = grid?.getBoundingClientRect();
                                const gridStyles = grid
                                  ? getComputedStyle(grid)
                                  : null;
                                const columns = gridStyles
                                  ? gridStyles.gridTemplateColumns.split(" ").length
                                  : 1;
                                const columnGap = gridStyles
                                  ? parseFloat(gridStyles.columnGap)
                                  : 0;
                                const columnWidth =
                                  gridBounds && columns > 0
                                    ? (gridBounds.width - columnGap * (columns - 1)) /
                                      columns
                                    : bounds.width;
                                const column = gridBounds
                                  ? Math.min(
                                      columns,
                                      Math.max(
                                        1,
                                        Math.floor(
                                          (bounds.left - gridBounds.left) /
                                            (columnWidth + columnGap),
                                        ) + 1,
                                      ),
                                    )
                                  : 1;
                                setSelectedSize({
                                  width: bounds.width,
                                  height: bounds.height,
                                  column,
                                });
                                setIsClosing(false);
                                setIsImageRevealing(false);
                                setSelectedId(item.id);
                              }}
                            >
                              <Image
                                src={item.thumbnail}
                                alt=""
                                fill
                                unoptimized
                                sizes="(max-width: 600px) 44vw, (max-width: 900px) 28vw, 180px"
                              />
                              <span className="admin-archive-thumbnail-overlay">
                                <strong>{item.title}</strong>
                                <span>{item.displayDate}</span>
                              </span>
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            ) : (
              <p className="admin-archive-empty">
                {dateFilter
                  ? `No hay ${itemLabel.toLowerCase()} para esa fecha.`
                  : `No hay ${itemLabel.toLowerCase()} todavía.`}
              </p>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
