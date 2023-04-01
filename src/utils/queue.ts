interface IQueue<T> {
  enqueue(item: T): void;
  dequeue(): void;
  clear(): void;
  getElements(): (T | null)[];
}

export class Queue<T> implements IQueue<T> {
  container: (T | null)[] = [];
  head: number = 0;
  tail: number = 0;
  size: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = new Array(size).fill(null);
  }

  enqueue = (item: T) => {
    this.container[this.tail] = item;
    this.tail++;
  };

  dequeue = () => {
    this.head++;
    const prev = this.head - 1;
    this.container[prev] = null;
  };

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.container = new Array(this.size).fill(null);
  };

  getElements = () => {
    return this.container;
  };
}
