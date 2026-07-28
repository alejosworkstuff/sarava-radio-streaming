export const COMMENT_PAGE_KEYS = {
  "radio-streaming": {
    label: "Radio streaming",
    path: "/radio-streaming",
  },
  podcast: {
    label: "Podcast",
    path: "/podcast",
  },
} as const;

export type CommentPageKey = keyof typeof COMMENT_PAGE_KEYS;

export function isCommentPageKey(value: string): value is CommentPageKey {
  return value in COMMENT_PAGE_KEYS;
}
