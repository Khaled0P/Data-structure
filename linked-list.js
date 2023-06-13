class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  //place node last
  append(value) {
    let node = new Node(value);
    let current;
    if (!this.head) {
      this.head = node;
    } else {
      //find last node
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }
  //place node first
  preppend(value) {
    this.head = new Node(value, this.head);
    this.size++;
  }

  //get last node
  tail() {
    let current;
    if (!this.head) {
      return null;
    }
    current = this.head;
    while (current.next) {
      current = current.next;
    }
    return current;
  }

  //get node at index
  at(index) {
    if (index > this.size) return 'list too short';
    let current = this.head;
    for (let i = 1; i < index; i++) {
      current = current.next;
    }
    return current;
  }

  //remove last element
  pop() {
    let current = this.head;
    let previous;
    while (current.next) {
      previous = current;
      current = current.next;
    }
    previous.next = null;
    this.size--;
  }
  //check if list contains inserted value
  contains(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) {
        return true;
      }
      current = current.next;
    }
    return false;
  }
  //finds given element index in list
  find(value) {
    let current = this.head;
    let count = 0;
    while (count < this.size) {
      if (current.value === value) {
        return count;
      }
      current = current.next;
      count++;
    }
    return null;
  }
  // return all values as strings
  toString() {
    let current = this.head;
    let arr = [];
    while (current) {
      arr.push(`(${current.value}) ->`);
      current = current.next;
    }
    arr.push('null');
    return arr.join(' ');
  }

  //insert new node at specified index
  insertAt(value, index) {
    if (index > 0 && index > this.size) return;
    const node = new Node(value);

    let current = this.head;
    let previous;
    let count = 0;
    if (index === 0) {
      this.head = node;
      node.next = current;
    } else {
      while (count < index) {
        count++;
        previous = current;
        current = current.next;
      }
      previous.next = node;
      node.next = current;
    }
    this.size++;
  }
  //remove node at given index
  removeAt(index) {
    if (index > 0 && index > this.size) return;
    if (!this.head) return;
    let current = this.head;
    let previous;
    let count = 0;
    if (index === 0) {
      this.head = current.next;
    } else {
      while (count < index) {
        count++;
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
    }
    this.size--;
  }
}
