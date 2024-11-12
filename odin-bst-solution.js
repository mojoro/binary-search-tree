class Node {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const sorted = this.sort(array);
    const sortedNoDupes = this.removeDuplicates(sorted);
    return this.sortedArrayToBST(sortedNoDupes);
  }

  sort(arr, sortedArray = []) {
    if (arr.length == 1) {
      return arr;
    } else if (arr.length > 1) {
      const left = arr.slice(0, arr.length / 2);
      const right = arr.slice(arr.length / 2, arr.length);
      const leftSorted = this.sort(left);
      const rightSorted = this.sort(right);

      let i = 0,
        j = 0,
        k = 0;

      while (i <= leftSorted.length - 1 && j <= rightSorted.length - 1) {
        if (leftSorted[i] < rightSorted[j]) {
          sortedArray[k++] = leftSorted[i++];
        } else {
          sortedArray[k++] = rightSorted[j++];
        }
      }
      for (i = i; i <= leftSorted.length - 1; i++) {
        sortedArray[k++] = leftSorted[i];
      }
      for (j = j; j <= rightSorted.length - 1; j++) {
        sortedArray[k++] = rightSorted[j];
      }
    }
    return sortedArray;
  }

  removeDuplicates(array) {
    const noDuplicates = [];
    noDuplicates.push(array[0]);
    for (let i = 1; i < array.length; i++) {
      if (array[i - 1] == array[i]) {
        continue;
      } else {
        noDuplicates.push(array[i]);
      }
    }

    return noDuplicates;
  }

  sortedArrayToBST(array) {
    if (array.length === 0) {
      return null; // Return null for empty arrays
    } else if (array.length === 1) {
      return new Node(array[0]); // Return a single node for single-element arrays
    } else if (array.length > 1) {
      const mid = Math.floor(array.length / 2); // Use Math.floor for midpoint
      const node = new Node(array[mid]);
      const leftArray = array.slice(0, mid);
      const rightArray = array.slice(mid + 1);

      if (leftArray.length > 0) {
        node.left = this.sortedArrayToBST(leftArray);
      }
      if (rightArray.length > 0) {
        node.right = this.sortedArrayToBST(rightArray);
      }
      return node;
    }
  }

  // start at root, if value < node, check node.left, else check node.right.
  // if checked position is null, insert value
  insert(value, node = this.root) {
    if (value < node.data) {
      if (node.left) this.insert(value, node.left);
      else node.left = new Node(value);
    } else if (value > node.data) {
      if (node.right) this.insert(value, node.right);
      else node.right = new Node(value);
    }
  }

  deleteItem(value, node = this.root, parent = null) {
    const returnNodeInfo = (value, node, parent) => {
      if (!node) return null;

      if (value < node.data) {
        parent = { node: node, direction: "left" };
        return returnNodeInfo(value, node.left, parent);
      } else if (value > node.data) {
        parent = { node: node, direction: "right" };
        return returnNodeInfo(value, node.right, parent);
      } else {
        return { node, parent };
      }
    };

    const returnLastRightNode = (node) => {
      if (!node) {
        return null;
      } else if (node.right) {
        return returnLastRightNode(node.right);
      } else return node;
    };

    const deleteNodeInfo = returnNodeInfo(value, node, parent);
    const nodeToDelete = deleteNodeInfo.node;

    // Check if the targeted node is the root node.
    if (nodeToDelete == node) {
      const lastRightNode = returnLastRightNode(node.left);
      this.deleteItem(lastRightNode.data);
      node.data = lastRightNode.data;
      return;
    }

    const parentOfDeleted = deleteNodeInfo.parent.node;
    const direction = deleteNodeInfo.parent.direction;
    const leftChild = nodeToDelete.left;
    const rightChild = nodeToDelete.right;

    if (!leftChild && !rightChild) parentOfDeleted[direction] = null;
    else if (leftChild && !rightChild) parentOfDeleted[direction] = leftChild;
    else if (!leftChild && rightChild) parentOfDeleted[direction] = rightChild;
    else if (leftChild && rightChild) {
      const lastRightNode = returnLastRightNode(leftChild);
      this.deleteItem(lastRightNode.data);
      parentOfDeleted[direction].data = lastRightNode.data;
    }
  }

  find(value, node = this.root) {
    if (!node) return null;

    if (value < node.data) {
      return this.find(value, node.left);
    } else if (value > node.data) {
      return this.find(value, node.right);
    } else {
      return node;
    }
  }

  // breadth-first search, implementing callback on each node
  levelOrder(callback) {
    if (!callback) throw new Error("Please pass in callback function");
    let q = [this.root];
    let frontIndex = 0;

    while (frontIndex < q.length) {
      let front = q[frontIndex];
      callback(front);
      if (front.left) q.push(front.left);
      if (front.right) q.push(front.right);
      frontIndex++;
    }
  }

  //depth-first DLR
  preOrder(callback, node = this.root) {
    if (!callback) throw new Error("Please pass in callback function");
    if (node == null) return;
    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  //depth-first LDR
  inOrder(callback, node = this.root) {
    if (!callback) throw new Error("Please pass in callback function");
    if (node == null) return;
    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }

  //depth-first LRD
  postOrder(callback, node = this.root) {
    if (!callback) throw new Error("Please pass in callback function");
    if (node == null) return;
    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }

  height(node) {
    if (!node) return -1;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    let currentNode = this.root;
    let depth = 0;
    while (currentNode.data != node.data) {
      if (currentNode.data > node.data) {
        depth++;
        currentNode = currentNode.left;
      } else {
        depth++;
        currentNode = currentNode.right;
      }
    }
    return depth;
  }

  isBalanced(node = this.root) {
    if (!node) return -1;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return Math.abs(leftHeight - rightHeight) < 2;
  }

  rebalance() {
    const inorder = [];
    tree.inOrder((node) => {
      inorder.push(node.data);
    });
    this.root = this.sortedArrayToBST(inorder);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function arrayOfRandomNumbers(arraySize, minSize = 0) {
  const array = [];
  for (let i = 0; i < arraySize; i++) {
    const randomNumber = minSize + Math.floor(Math.random() * 100);
    array.push(randomNumber);
  }
  return array;
}
const randoms = arrayOfRandomNumbers(35);

const tree = new Tree(randoms);
console.log("Balanced? " + tree.isBalanced());

prettyPrint(tree.root);

console.log("Level Order");
let level = [];
tree.levelOrder((node) => {
  level.push(node.data);
});
console.log(level);

console.log("Preorder");
let preorder = [];
tree.preOrder((node) => {
  preorder.push(node.data);
});
console.log(preorder);

console.log("Inorder");
let inorder = [];
tree.inOrder((node) => {
  inorder.push(node.data);
});
console.log(inorder);

console.log("Postorder");
let postorder = [];
tree.postOrder((node) => {
  postorder.push(node.data);
});
console.log(postorder);

const bigNumbers = arrayOfRandomNumbers(13, 100);
for (const number of bigNumbers) {
  tree.insert(number);
}

console.log("Balanced? " + tree.isBalanced());
console.log("Rebalancing");
tree.rebalance();
console.log("Balanced? " + tree.isBalanced());

console.log("Level Order");
level = [];
tree.levelOrder((node) => {
  level.push(node.data);
});
console.log(level);

console.log("Preorder");
preorder = [];
tree.preOrder((node) => {
  preorder.push(node.data);
});
console.log(preorder);

console.log("Inorder");
inorder = [];
tree.inOrder((node) => {
  inorder.push(node.data);
});
console.log(inorder);

console.log("Postorder");
postorder = [];
tree.postOrder((node) => {
  postorder.push(node.data);
});
console.log(postorder);
