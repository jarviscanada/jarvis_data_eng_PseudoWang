class MyNode<T> {
  prev: MyNode<T> | null;
  next: MyNode<T> | null;
  val: T;
}

class DoublyLinkedList<T> {
  head: MyNode<T> | null;
  tail: MyNode<T> | null;
  size: number;

  constructor() {
    this.size = 0;
  }

  push(val: T): void {
    let newTail = new MyNode<T>();
    newTail.val = val;
    if (this.size === 0) this.head = this.tail = newTail;
    else {
      let oldTail = this.tail;
      newTail.prev = oldTail;
      if (oldTail) oldTail.next = newTail;
      this.tail = newTail;
    }
    ++this.size;
  }

  pop(): T | null {
    // if statement to avoid `object might be null` error
    if (this.tail) {
      let oldTail = this.tail;
      let newTail = this.tail.prev ? this.tail.prev : null;
      oldTail.prev = null;
      if (newTail) newTail.next = null;
      this.tail = newTail;
      --this.size;
      if (this.size === 0) this.head = this.tail = null;
      return oldTail.val;
    }
    return null;
  }

  shift(): T | null {
    // if statement to avoid `object might be null` error
    if (this.head) {
      let oldHead = this.head;
      let newHead = this.head.next ? this.head.next : null;
      oldHead.next = null;
      if (newHead) newHead.prev = null;
      this.head = newHead;
      --this.size;
      if (this.size === 0) this.head = this.tail = null;
      return oldHead.val;
    }
    return null;
  }

  unshift(val: T): void {
    let newHead = new MyNode<T>();
    newHead.val = val;
    if (this.size === 0) this.tail = this.head = newHead;
    else {
      let oldHead = this.head;
      newHead.next = oldHead;
      if (oldHead) oldHead.prev = newHead;
      this.head = newHead;
    }
    ++this.size;
  }
}
