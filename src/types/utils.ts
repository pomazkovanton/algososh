export type TMethod = "ascending" | "descending";

export type TQueue = {
  items: string[];
  head: number;
  tail: number;
};

export type TQueueStatus = "enqueue" | "dequeue" | "clear" | null;

export type TListStatus =
  | "add-in-head"
  | "add-in-tail"
  | "remove-from-head"
  | "remove-from-tail"
  | "add-by-index"
  | "remove-by-index"
  | null;
