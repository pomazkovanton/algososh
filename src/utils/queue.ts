interface IQueue<T> {
  enqueue(item: T): void;
  dequeue(): void;
  clear(): void;
  getElements(): (T | null)[];
  getHead(): number;
  getTail(): number;
  isEmpty(): boolean;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head: number = 0;
  private tail: number = 0;
  private size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = new Array(size).fill(null);
  }

  enqueue = (item: T) => {
    this.container[this.tail] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    this.head++;
    const prev = this.head - 1;
    this.container[prev] = null;
    this.length--;
  };

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container = new Array(this.size).fill(null);
  };

  getElements = () => this.container;

  getHead = () => this.head;

  getTail = () => this.tail;

  isEmpty = () => this.length === 0;
}
