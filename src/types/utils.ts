export type TMethod = "ascending" | "descending";

export type TQueue = {
  items: string[];
  head: number;
  tail: number;
};

export type TQueueStatus = "enqueue" | "dequeue" | "clear" | null;
