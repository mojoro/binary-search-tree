class Node {
  constructor(root = null, left = null, right = null) {
    this.root = root;
    this.left = left;
    this.right = right;
  }
}

class Solution {
  sortedArrayToBST(nums) {
    if (nums.length == 1) {
      return;
    } else if (nums.length > 1) {
      const mid = Math.ceil(nums.length / 2);
      const node = new Node(nums[mid - 1]);
      const left = 0;
      const right = nums.length;
      const leftArray = nums.slice(left, mid - 1);
      const rightArray = nums.slice(mid, right);

      if (leftArray.length == 1) node.left = new Node(leftArray[0]);
      else node.left = this.sortedArrayToBST(leftArray, node);

      if (rightArray.length == 1) node.right = new Node(rightArray[0]);
      else node.right = this.sortedArrayToBST(rightArray, node);
      return node;
    }
  }
}
const solution = new Solution();
const array = [1, 2, 3, 4, 5, 9, 14];
console.log(solution.sortedArrayToBST(array));
console.log(solution.sortedArrayToBST([1, 2, 3, 4]));

/*
Function to take the midpoint, push the midpoint, then take and push the midpoint of each array to the left and right of the midpoint
*/
