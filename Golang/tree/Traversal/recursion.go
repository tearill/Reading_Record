// 递归实现树的遍历
package main

import "fmt"

// 定义树的结构类
type Node struct {
	value int 
	left *Node
	right *Node
}

func CreateNode(value int) *Node {
	return &Node{ value, nil, nil }
}

// 递归先序遍历
func preorderTraversal(n *Node) {
	if n == nil {
		return 
	} else {
		fmt.Printf("%d ", n.value)
		preorderTraversal(n.left)
		preorderTraversal(n.right)
	}
}

func inorderTraversal(n *Node) {
	if n == nil {
		return 
	} else {
		inorderTraversal(n.left)
		fmt.Printf("%d ", n.value)
		inorderTraversal(n.right)
	}
}

func postorderTraversal(n *Node) {
	if n == nil {
		return 
	} else {
		postorderTraversal(n.left)
		postorderTraversal(n.right)
		fmt.Printf("%d ", n.value)
	}
}

// 	     1
//   2       3
// 4   5   6   7
func main() {
	root := CreateNode(1)
	root.left = CreateNode(2)
	root.right = CreateNode(3)
	root.left.left = CreateNode(4)
	root.left.right = CreateNode(5)
	root.right.left = CreateNode(6)
	root.right.right = CreateNode(7)
	fmt.Println("递归先序遍历: ")
	preorderTraversal(root)
	fmt.Printf("\n")
	fmt.Println("递归中序遍历: ")
	inorderTraversal(root)
	fmt.Printf("\n")
	fmt.Println("递归后序遍历: ")
	postorderTraversal(root)
}