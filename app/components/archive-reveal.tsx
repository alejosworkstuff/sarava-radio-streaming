"use client";

import { useState } from "react";

type ArchiveRevealProps<T> = {
  buttonLabel: string;
  hideLabel: string;
  emptyMessage: string;
  ariaLabel: string;
  items: T[];
  renderItem?: (item: T) => React.ReactNode;
  getKey?: (item: T) => string;
  renderContent?: (items: T[]) => React.ReactNode;
};

export function ArchiveReveal<T>({
  buttonLabel,
  hideLabel,
  emptyMessage,
  ariaLabel,
  items,
  renderItem,
  getKey,
  renderContent,
}: ArchiveRevealProps<T>) {
  const [open, setOpen] = useState(false);
  const listId = `${ariaLabel.replace(/\s+/g, "-")}-list`;

  return (
    <div className="archive-reveal">
      <button
        type="button"
        className="archive-toggle-btn"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? hideLabel : buttonLabel}
        {items.length > 0 ? ` (${items.length})` : ""}
      </button>

      {open && (
        <div id={listId} className="archive-list" aria-label={ariaLabel}>
          {items.length === 0 ? (
            <p className="archive-empty">{emptyMessage}</p>
          ) : renderContent ? (
            renderContent(items)
          ) : (
            items.map((item) => (
              <div
                className="archive-list-item"
                key={getKey ? getKey(item) : String(item)}
              >
                {renderItem?.(item)}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
