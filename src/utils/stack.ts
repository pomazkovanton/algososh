export interface IStack<T> {
  push(item: T): void;
  pop(): void;
  clear(): void;
  getSize(): number;
}

export class Stack<T> implements IStack<T> {
  container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  clear = (): void => {
    this.container = [];
  };

  getSize = () => this.container.length;
}
