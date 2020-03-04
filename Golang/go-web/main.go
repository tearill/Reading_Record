package main

import (
	"fmt"
	"net/http" // 安装了 gin 引入 gin 框架

	"github.com/gin-gonic/gin"
)

func main() {
	// r := gin.Default() // node -> new Koa()  相当于 web app
	// // 路由 GET 请求
	// r.GET("/ping", func(c *gin.Context) { // c 是指针，指向 gin.Context
	// 	c.JSON(200, gin.H { // 返回 JSON gin.H 是 json 格式化的简写
	// 		"message": "pong"
	// 	})
	// })
	// r.Run(":8888") // 启动服务监听端口 类似 node 中的 server.listen

	// 上传文件
	router := gin.Default() // 新建一个模板实例
	// context -> req+res 和 koa 中的 ctx 一样
	router.POST("/upload", func(c *gin.Context) { // 路由
		// 不使用 GET 配合 input file
		file, _ := c.FormFile("file") // 取出文件
		// 返回字符串 相当于 koa 中的 res.end()
		c.SaveUploadedFile(file, file.Filename)                                // 保存上传的文件
		c.String(http.StatusOK, fmt.Sprintf("'%s', uploaded!", file.Filename)) // http.StatusOK为状态码
	})
	router.Run(":8888")
}
