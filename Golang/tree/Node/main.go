// go tree

package main

import "fmt"

// tree TreeNode 用递归的概念来定义
// 树节点
type Node struct {
	value int 
	left *Node // 左右子结点还是 Node 类型
	right *Node
}

// 找节点 时间复杂度 链表的 O(n) -> O(logn) 递归
func (node *Node) FindNode(n *Node, x int) *Node { // 头结点 | 节点值
	// 在一棵树里找节点 -> 每三个节点里 
	if n == nil {
		return nil
	} else if n.value == x {
		return n // 退出节点
	} else {
		p := node.FindNode(n.left, x) // 找左子树，沿着左子树一直走
		if p!= nil { // 找到了
			return p
		}
		return node.FindNode(n.right, x)
	}
}
func (node *Node) GetTreeHeight(n *Node) int {
	if n == nil {
		return 0
	} else {
		// 当前节点的高度，Math.max(左子树的高度，右子树的高度) + 1
		lHeight := node.GetTreeHeight(n.left)
		rHeight := node.GetTreeHeight(n.right)
		// return max(lHeight, rHeight) + 1
		if lHeight > rHeight {
			return lHeight + 1
		} else {
			return rHeight + 1
		}
	}
}

func (node *Node) GetLeafNode(n *Node) {
	// 叶结点 -> 左节点和右节点为空
	// 判断每个节点的左节点和右节点
	if n != nil {
		if n.left == nil && n.right == nil {
			fmt.Printf("%d", n.value)
		}
		node.GetLeafNode(n.left)
		node.GetLeafNode(n.right)
	}
}

func CreateNode(value int) *Node {
	return &Node{ value, nil, nil } // 左右节点为空，& 取地址返回指针
}
	// 		  5
	//  2       4
  //    7   8   9
  //   6
func main() {
	root := CreateNode(5) // 根节点
	root.left = CreateNode(2) // CreateNode 生成的节点可以作为其他节点的左右指针
	root.right = CreateNode(4)
	root.left.right = CreateNode(7)
	root.left.right.left = CreateNode(6)
	root.right.left = CreateNode(8)
	root.right.right = CreateNode(9)

	fmt.Printf("%d\n", root.FindNode(root, 4).value) // 4 的节点
	fmt.Printf("%d\n", root.GetTreeHeight(root)) // 树的深度
	root.GetLeafNode(root) // 得到所有的叶结点
}