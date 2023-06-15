class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }
  buildTree(arr) {
    const sortedArr = [...new Set(arr.sort((a, b) => a - b))];
    const finishedTree = this.treeStruct(sortedArr);
    return finishedTree;
  }
  treeStruct(arr) {
    if (!arr.length) {
      return null;
    }
    let mid = Math.floor(arr.length / 2);
    const root = new Node(arr[mid]);
    let leftArr = arr.slice(0, mid);
    let rightArr = arr.slice(mid + 1);
    root.left = this.treeStruct(leftArr);
    root.right = this.treeStruct(rightArr);
    return root;
  }
  insert(data) {
    const node = new Node(data);
    if (this.root === null) {
      this.root = node;
    } else {
      this.insertNode(this.root, node);
    }
  }
  insertNode(root, node) {
    if (node.data < root.data) {
      if (root.left === null) {
        root.left = node;
      } else {
        this.insertNode(root.left, node);
      }
    } else if (node.data > root.data) {
      if (root.right === null) {
        root.right = node;
      } else {
        this.insertNode(root.right, node);
      }
    }
  }
  min(node) {
    if (!node.left) {
      return node.data;
    }
    return this.min(node.left);
  }
  delete(data) {
    this.root = this.deleteNode(this.root, data);
  }
  deleteNode(root, data) {
    if (root === null) {
      return root;
    }
    if (data < root.data) {
      root.left = this.deleteNode(root.left, data);
    } else if (data > root.data) {
      root.right = this.deleteNode(root.right, data);
    } else {
      if (!root.left && !root.right) {
        return null;
      }
      if (!root.left) {
        return root.right;
      }
      if (!root.right) {
        return root.left;
      }
      root.data = this.min(root.right);
      root.right = this.deleteNode(root.right, root.data);
    }
    return root;
  }
  find(data) {
    return this.findNode(this.root, data);
  }
  findNode(root, data) {
    if (data === root.data) {
      return root;
    } else if (data < root.data) {
      return this.findNode(root.left, data);
    } else if (data > root.data) {
      return this.findNode(root.right, data);
    }
  }
  preOrder(func, root = this.root) {
    if (root) {
      func(root.data);
      this.preOrder(func, root.left);
      this.preOrder(func, root.right);
    }
  }
  inOrder(func = [], root = this.root) {
    if (root) {
      this.inOrder(func, root.left);
      if (Array.isArray(func)) {
        func.push(root.data);
      } else {
        func(root.data);
      }
      this.inOrder(func, root.right);
      if (Array.isArray(func)) return func;
    }
  }
  postOrder(func, root = this.root) {
    if (root) {
      this.postOrder(func, root.left);
      this.postOrder(func, root.right);
      func(root.data);
    }
  }
  levelOrder(func) {
    const queue = [];
    queue.push(this.root);
    while (queue.length) {
      let current = queue.shift();
      func(current.data);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
  }
  minHeight(node = this.root) {
    if (!node) {
      return -1;
    }
    let left = this.minHeight(node.left);
    let right = this.minHeight(node.right);
    if (left < right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }
  maxHeight(node = this.root) {
    if (!node) {
      return -1;
    }
    let left = this.maxHeight(node.left);
    let right = this.maxHeight(node.right);
    if (left > right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }
  isBalanced() {
    return this.minHeight() >= this.maxHeight() - 1;
  }
  balanceTree() {
    this.root = this.buildTree(this.inOrder());
  }
}

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5]);

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
