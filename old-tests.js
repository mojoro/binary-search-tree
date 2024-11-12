const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);
tree.deleteItem(23);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(15);
tree.insert(16);
tree.insert(17);
tree.deleteItem(8);
prettyPrint(tree.root);

console.log("Level Order");
const level = [];
tree.levelOrder((node) => {
  level.push(node.data);
});
console.log(level);

console.log("Preorder");
const preorder = [];
tree.preOrder((node) => {
  preorder.push(node.data);
});
console.log(preorder);

console.log("Inorder");
const inorder = [];
tree.inOrder((node) => {
  inorder.push(node.data);
});
console.log(inorder);

console.log("Postorder");
const postorder = [];
tree.postOrder((node) => {
  postorder.push(node.data);
});
console.log(postorder);

console.log(tree.depth(tree.find(7)));
console.log("Balanced? " + tree.isBalanced());

tree.rebalance();
prettyPrint(tree.root);
console.log("Balanced? " + tree.isBalanced());
