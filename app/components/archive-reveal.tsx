"use client";

import { useState } from "react";

type ArchiveRevealProps<T> = {
  buttonLabel: string;
  hideLabel: string;
  emptyMessage: string;
  ariaLabel: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getKey: (item: T) => string;
};

export function ArchiveReveal<T>({
  buttonLabel,
  hideLabel,
  emptyMessage,
  ariaLabel,
  items,
  renderItem,
  getKey,
}: ArchiveRevealProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <div className="archive-reveal">
      <button
        type="button"
        className="archive-toggle-btn"
        aria-expanded={open}
        aria-controls={`${ariaLabel.replace(/\s+/g, "-")}-list`}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? hideLabel : buttonLabel}
        {items.length > 0 ? ` (${items.length})` : ""}
      </button>

      {open && (
        <div
          id={`${ariaLabel.replace(/\s+/g, "-")}-list`}
          className="archive-list"
          aria-label={ariaLabel}
        >
          {items.length === 0 ? (
            <p className="archive-empty">{emptyMessage}</p>
          ) : (
            items.map((item) => (
              <div className="archive-list-item" key={getKey(item)}>
                {renderItem(item)}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
