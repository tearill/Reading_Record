# Proxy  
- Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改 --- 元编程  

- Proxy 可以理解成在目标对象前架设一个"拦截"层，外界对该对象的访问都必须先通过这层拦截，因此提供了一种机制可以对外界的访问进行过滤和改写  

- 使用形式：  
  var proxy= new Proxy(target, handler);   
  new Proxy()，表示生成一个 Proxy 实例， target 参数表示所要拦截的目标对象， handler 参数也是一个对象，用来定制拦截行为  

- 例子：  
  ```js
  var proxy= new Proxy({}, { 
      get: function(target, property) { 
          return 35;
      }
  )}
  proxy.time; // 35 
  proxy.name; // 35 
  proxy.title; // 35 
  ```
  要使 Proxy 起作用，必须针对 Proxy 实例(proxy)进行操作，而不是针对目标对象(例子中是空对象{})进行操作。 