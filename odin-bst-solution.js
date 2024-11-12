class Node {
  constructor(data = null) {
    this.data = null;
    this.left = null;
    this.right = null;
    if (data) this.data = data;
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
    if (array.length == 1) {
      return;
    } else if (array.length > 1) {
      const mid = Math.ceil(array.length / 2);
      const node = new Node(array[mid - 1]);
      const left = 0;
      const right = array.length;
      const leftArray = array.slice(left, mid - 1);
      const rightArray = array.slice(mid, right);

      if (leftArray.length == 1) node.left = new Node(leftArray[0]);
      else if (leftArray.length > 0)
        node.left = this.sortedArrayToBST(leftArray);

      if (rightArray.length == 1) node.right = new Node(rightArray[0]);
      else if (rightArray.length > 1)
        node.right = this.sortedArrayToBST(rightArray);
      return node;
    }
  }

  insert(value) {}

  deleteItem(value) {}

  find(value) {}

  levelOrder(callback) {}

  inOrder(callback) {}

  postOrder(callback) {}

  height(node) {}

  depth(node) {}

  isBalanced() {}

  rebalanced() {}
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

console.log(arrayOfRandomNumbers(15));

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);
