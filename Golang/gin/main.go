package main  // module

// gin 第三方模块
import (
	"github.com/gin-gonic/gin"
	"net/http" // http 模块 -> node http 模块
)

func main() { // 入口
	// gin --- Go 语言的 web引擎
	engine := gin.Default() // node -> const app = express()
	// node -> router --- 请求路径 + url
	engine.GET("/", func(context *gin.Context) { // context (gin.Context)的指针类型
		// context -> koa 中的 ctx -> express 中的 req + res
		context.String(404, "hello gin get method") // node -> res.send() http.StatusOK(200) -> 状态码
	}) 
	// 使用相对应语义的请求动词 + url 语义化 
	engine.POST("/", func(context *gin.Context) {
		// 保存数据 添加
		context.String(http.StatusOK, "hello gin post method")
	})
	// PUT 修改，整个的替换
	engine.PUT("/", func(context *gin.Context) {
		context.String(http.StatusOK, "hello gin put method")
	})
	// GET "/post/123" --- 获取文章
	// DELETE "/post/123" --- 删除文章
	engine.DELETE("/", func(context *gin.Context) {
		context.String(http.StatusOK, "hello gin delete method")
	})
	// PATCH 局部更新
	engine.PATCH("/", func(context *gin.Context) {
		context.String(http.StatusOK, "hello gin patch method")
	})
	// HEAD 不需要响应体，只获取响应头
	// 在不获取资源的情况下，了解资源的信息(比如文件大小、是否存在、是否修改过)
	engine.HEAD("/", func(context *gin.Context) {
		context.String(http.StatusOK, "hello gin head method")
	})
	// OPTIONS 测试目的资源所支持的所有通信请求方法
	engine.OPTIONS("/", func(context *gin.Context) {
		context.String(http.StatusOK, "hello gin options method")
	})
	// _ 表示剩下的所有参数 restful 
	_ = engine.Run(":3000") // node -> app.listen() 端口
}