package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	fmt.Println("node 向 Go 迁移")
	url := "http://juejin.im/timeline" // 声明一个变量
	download(url)                      // 将任务交给 download 方法
}

func download(url string) { // nodejs -> 弱类型 go -> 强类型
	client := &http.Client{} // 启动(实例化) http 客户端，& 用来取地址
	// http.NewRequest(methods, url, body)
	req, _ := http.NewRequest("GET", url, nil) // 发起同步请求    下划线 _ 代表剩下的所有参数 --- 类似 JS 中的...剩余运算符
	// 用户代理 --- 模拟自己是用什么样的设备去请求 --- 让服务器去识别
	req.Header.Set("User-Agent", "Mozilla/4.0(compatible; MSIE 6.0; Windows NT 5.1)") // node writeHead
	resp, err := client.Do(req)                                                       // 去请求，拿到响应

	if err != nil {
		fmt.Println("http get error", err)
		return
	}
	// 响应
	body, err := ioutil.ReadAll(resp.Body) // 拿到响应体
	if err != nil {
		fmt.Println("read error", err)
		return
	}
	fmt.Println(string(body))
}
