# Go 语言中的树的实现  

- 树 递归  
1. DOM 树状结构 递归  
  ```js    
        body root  
      .container  
    .wrap
  div
  我的(文本节点)
  ```
2. Tree  
  ```js
           1
      2         3  
   4     5  
       6 
    null null   
  ```
3. Vue 
  树状组件  

- 类的声明  
  ```go
  type (name) struct {
    // 构造变量声明
  }  
  ```
- 类的方法的声明  
  在方法名前加上 (xx *类名)  
  xx 代表了类的 this  