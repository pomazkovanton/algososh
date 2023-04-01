export class Node<T> {
  public data: T;
  public next: Node<T> | null = null;
  constructor(data: T, next: Node<T> | null = null) {
    this.data = data;
    this.next = next === undefined ? null : next;
  }
}

type ILinkedList<T> = {
  append(data: T): void;
  prepend(data: T): void;
  deleteHead(): Node<T> | null;
  deleteTail(): Node<T> | null;
  insertInPosition(position: number, data: T): void;
  fromArray(array: Array<T>): void;
  toArray(): Node<T>[];
  getSize(): number;
};

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(value: T) {
    const newNode = new Node(value);

    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      this.size++;
      return this;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    this.size++;
    return this;
  }

  prepend(value: T) {
    const newNode = new Node(value, this.head);
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    this.size++;
    return this;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }
    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.size--;
    return deletedHead;
  }

  deleteTail() {
    if (!this.tail) {
      return null;
    }

    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.size--;
      return deletedTail;
    }
    let currentNode = this.head;
    while (currentNode?.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }
    this.tail = currentNode;
    this.size--;
    return deletedTail;
  }

  insertInPosition(position: number, data: T) {
    if (position < 0 || position > this.size) {
      return;
    }

    let node = new Node(data);

    if (position === 0) {
      this.append(data);
    } else {
      let current = this.head;
      let prev = null;
      let index = 0;

      while (index < position) {
        prev = current;
        current = current?.next || null;
        index++;
      }

      if (prev) {
        prev.next = node;
        node.next = current;
      }
      this.size++;
    }
  }

  fromArray(values: Array<T>) {
    values.forEach((value) => this.append(value));
    return this;
  }

  toArray() {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }

  getSize() {
    return this.size;
  }
}
