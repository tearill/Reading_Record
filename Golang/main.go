// 入口文件
package main

import (
	"fmt" // node 里的 require('fs)
	"io/ioutil"
	"net/http"
)

// 函数声明
func main() {
	fmt.Println("hello world")
	// node http.get  回调方式
	// 同步 阻塞
	resp, err := http.Get("http://www.baidu.com") // := 表示定义一个变量并给他赋值
	if err != nil {                               // nil => null
		fmt.Println("http get error", err)
		return
	}
	// fmt.Println(resp)
	// 网络 IO -> 通过端口进来
	// 文件 IO -> 读入文件
	// resp -> 响应 -> resp.Body -> 响应体
	body, err := ioutil.ReadAll(resp.Body) // ioutil -> 库 -> 网络 IO -> 读取 url
	if err != nil {
		fmt.Println("read over")
		return
	}
	fmt.Println(string(body))
}
