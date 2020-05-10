# 第六章 理解Buffer  
## Buffer 结构  
一个像 Array 的结构，**主要用于操作字节(二进制数据)**  
- 模块结构  
  + JavaScript 与 C++ 结合的模块 => 性能相关的部分用 C++，非性能相关部分用 JavaScript 实现  
  + Buffer 所占的内存不通过 V8 分配，属于堆外内存  

- 对象结构  
  + Buffer 对象类似于数组，元素为**16进制**的两位数 => **[0, 255]**  
  使用: Buffer.from(buffer, 'utf-8')  
  ```js
  var str = '深入浅出node.js'
  var buffer = Buffer.from(str, 'utf-8')
  console.log(buffer)
  // <Buffer e6 b7 b1 e5 85 a5 e6 b5 85 e5 87 ba 6e 6f 64 65 2e 6a 73>
  // 中文字在 utf-8 编码下占用 3 个元素，字母和半角标点符号占用 1 一个元素
  ```
  (new Buffer() 的方式处于安全性问题问题已经废弃，但是还支持)  
  + Buffer 可以访问 length 属性得到长度，也可以通过下标访问元素  
  + 可以通过下标赋值  
    1. 小于 0 的话逐次加 256，直到得到 0-255 区间内的数值  
    2. 大于 255 的话逐次减 256，直到得到 0-255 区间内的数值  
    3. 如果是小数，舍弃小数部分  
  
- Buffer 内存分配  
  Buffer 对象的内存分配不是在 V8 的堆内存中，而是在 Node 的 C++ 层面实现内存的申请的  
  原因：  
  1. 处理大量的字节数据数组采用需要一点内存就向操作系统申请一点内存的方式，可能造成大量的内存申请的系统调用，对操作系统有一定压力  
  2. 采用 slab 分配机制来高效地使用申请来的内存  

  - slab 分配机制  
    slab 是一种动态内存管理机制  
    简单而言，slab 就是 一块申请好的固定大小地内存区域  
    slab 有 3 中状态：  
      1. full：完全分配状态  
      2. partial：部分分配状态  
      3. empty：没有被分配状态  

  - 分配的时候指定大小  
    `Buffer.alloc(size)`  
    Node 以 8KB 为界限来区分 Buffer 是大对象还是小对象  

  - 分配小 Buffer 对象  
    如果执行 Buffer 的大小少于 8KB，Node 会按照小对象的方式进行分配  
    使用局部变量 pool 作为中间处理对象，处于分配状态的 slab 单元都指向它  
    ```js
    var pool
    function allocPool() {
      pool = new SlowBuffer(Buffer.poolSize)
      pool.used = 0
    }
    ```
  > 注意事项：同一个 slab 可能分配给多个 Buffer 对象使用，只有这些小 Buffer 对象在作用域释放并都可以回收时，slab 的 8KB 空间才会被回收  

  - 分配大 Buffer 对象  
    如果需要超过 8KB 的对象，会直接分配一个 SlowBuffer 对象左右 slab 单元，这个 slab 单元将会被这个大 Buffer 对象独占  

### 小结  
真正的内存是在 Node 的 C++ 层面提供的，JavaScript 层面只是使用它。  
当进行小而频繁的 Buffer 操作时，采用 slab 的机制进行预先申请和事后分配，使得 JavaScript 到操作系统之间不必有过多的内存申请方面的系统调用。  
对于大块的 Buffer 而言，则直接使用 C++ 层面提供的内存，而无需细腻的分配操作  

## BUffer 的转换  
- 字符串转 Buffer  
  `Buffer.alloc(size[, fill[, encoding]])`  
  `Buffer.from(str, [encoding])`  
  通过构造函数转换的 Buffer 对象存储的只能是一种编码类型，encoding 参数不传递的时候，默认按照 UTF-8 编码进行转码和存储  
  Buffer 对象可以存储不同类型的字符串转码的值，调用 write 方法可以实现该目的  
  `buf.write(string[, offset[, length]][, encoding])`  
  1. string - 写入缓冲区的字符串
  2. offset - 缓冲区开始写入的索引值，默认为 0
  3. length - 写入的字节数，默认为 buffer.length
  4. encoding - 使用的编码，默认为 'utf8'  

- Buffer 转字符串  
  `buf.toString([encoding], [start], [end])`  
  如果 Buffer 对象由多种编码写入，就需要在局部指定不同的编码，才能转换回正常的编码  

- Buffer 不支持的编码类型  
  Buffer 提供了 isEncoding() 函数来判断编码是否支持转换  
  `buf.isEncoding(encoding)`  
  对于不支持的编码类型，可以借助 Node 生态圈中的模块完成转换，iconv 和 iconv-lite 可以支持更多的编码类型转换  
  iconv => 纯 JavaScript 实现，iconv-lite => 通过 C++ 调 libiconv 库完成  
  前者比后者更轻量，无须编译和处理环境依赖直接使用，在性能方面，由于转码都是耗用 CPU，在 V8 的高性能下，少了 C++ 到 JavaScript 的层次转换，纯 JavaScript 的性能比 C++ 实现得更好  
  ```js
  var iconv = require('iconv-lite')
  // Buffer 转字符串
  var str = iconv.decode(buf, 'win1251')
  // 字符串转 Buffer
  var buf = iconv.encode('Sample input string', 'win1251')
  ```

## Buffer 的拼接  
- Buffer 的常见使用场景  
  ```js
  var fs = require('fs')
  var rs = fs.createReadStream('test.md')
  var data = ''
  rs.on('data', function (chunk) {
    data += chunk
  })
  rs.on('end', function () {
    console.log(data)
  })
  ```
  一旦输入流中有宽字节编码时，就会产生乱码  
  data += chunk 中隐藏了 toString() 操作  

- 乱码是如何产生的  
  限制每次读取的长度，中文字符在 UTF-8 下占 3 个字节，宽字节字符存在被截断的可能  

- setEncoding() 和 string_decoder()  
  另一个设置编码的方法：setEncoding()  
  `readable.setEncoding(encoding)`  
  该方法让 data 事件中传递的不是 Buffer 对象而是编码后的字符串  
  ```js
  var rs = fs.createReadStream('test.md', { highWaterMark: 11 })
  rs.setEncoding('utf8')
  ```

- 正确拼接 Buffer  
  ```js
  var chunks = []
  var size = 0
  res.on('data', function (chunk) {
    chunks.push(chunk)
    size += chunk.length
  })
  res.on('end', function () {
    var buf = Buffer.concat(chunks, size)
    var str = iconv.decode(buf, 'utf8')
    console.log(str)
  })
  ```
  争取的拼接方式是用一个数组存储接收到的 Buffer 片段并记录下所有片段的总长度，然后调用 Buffer.concat() 方法生成一个合并的 Buffer 对象  

## Buffer 与性能  
Buffer 在文件 I/O 和网络 I/O 中运用广泛，尤其在网络传输中，性能举足轻重  
- 文件读取  
  Buffer 的使用除了与字符串的转换有性能损耗外，在文件读取时，highWaterMark 设置对性能的影响至关重要  
  P147-148  

  fs.createReadStream() 的工作方式是在内存中准备一段 Buffer，然后在 fs.read() 读取时逐步从磁盘中将字节复制到 Buffer 中，完成一次读取就从 Buffer 中通过 slice 方法取出部分数据作为一个小 Buffer 对象，再通过 data 事件传递给调用方，如果 Buffer 用完，则重新分配一个，如果有剩余，则继续使用  

  **highWaterMark的大小对性能有两个影响的点：**  
  1. highWaterMark 设置对 Buffer 内存的分配和使用有一定影响  
    文件流基于 Buffer 分配，Buffer 基于 SlowBuffer 分配，可以理解为两个维度的分配策略，如果文件过小(8KB)，则有可能造成 slab 未能完全使用  
  2. highWaterMark 设置过小可能导致系统调用次数过多  
    fs.createReadStream() 内部采用 fs.read() 实现，将会引起对磁盘的系统调用，对于大文件而言，highWaterMark 的大小决定会触发系统调用和 data 事件的次数  

## 总结  
Buffer 与字符串之间有实质上的区别，Buffer 是二进制数据，字符串与 Buffer 之间存在编码关系  