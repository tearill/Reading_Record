package main

import "fmt"

// 矩形类 OO (类 C 语言结构体)
type Rectangle struct { // constructor
	Length int 
	Width int
}
// js => prototype 火车头 prototype 方法
// go => 在方法前声明属于的类
func (r *Rectangle) Area() int {
	// r 代表 this
	return r.Length * r.Width
}

func main() {
	r := Rectangle{4, 2} // 实例化不需要使用 new，按照声明顺序赋值
	fmt.Println(r.Length)
	fmt.Println(r.Area())
}