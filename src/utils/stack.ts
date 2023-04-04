export interface IStack<T> {
  push(item: T): void;
  pop(): void;
  clear(): void;
  getElements(): T[];
  getSize(): number;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  clear = (): void => {
    this.container = [];
  };

  getElements = () => this.container;

  getSize = () => this.container.length;
}
