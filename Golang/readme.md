# Golang 云开发时代的 C 语言  

node -> Go  
koa -> gin web框架  

# Golang 初体验   
1. 每个文件都是一个独立的模块  
   package main --- 总入口 func main() {}  
2. go 的内置模块 --- 使用 import 引入   
   import (
       "fmt"
       "net/http"
   )  
3. if 不需要括号  
4. 变量可以直接写 使用 := 进行在定义的同时给它赋值 --- 类似于 ES6 中的解构赋值
5. resp, err := http.Get("http://www.baidu.com")  
   同步 没有回调  