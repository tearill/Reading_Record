var canvas = document.getElementById('myCanvas')
var gl = canvas.getContext('webgl') // 拿到 context 才能在 canvas 上进行绘制
console.log(gl)
var program = gl.createProgram()

var VSHADER_SOURCE, FSHADER_SOURCE
VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
  'void main() {\n' +
  'gl_Position = u_ModelMatrix * a_Position;\n' +
  '}\n'

FSHADER_SOURCE =
  'void main () {\n' +
  'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n'

var vertexShader, fragmentShader // 顶点着色器和片元着色器

function createShader(gl, sourceCode, type) {
  // 创建 shader
  var shader = gl.createShader(type)
  gl.shaderSource(shader, sourceCode) // 代码挂载
  gl.compileShader(shader) // 编译 shader
  return shader
}

// 定义顶点着色器
vertexShader = createShader(gl, VSHADER_SOURCE, gl.VERTEX_SHADER)
// 定义片元着色器
fragmentShader = createShader(gl, FSHADER_SOURCE, gl.FRAGMENT_SHADER)

gl.attachShader(program, vertexShader) // 绑定顶点着色器和片元着色器
gl.attachShader(program, fragmentShader)

// link program to context
gl.linkProgram(program)
gl.useProgram(program)
gl.program = program

var currentAngle = 0 // 初始旋转角为 0
var g_last = Date.now()

// 每一个 requestAnimationFrame 要做的事情
var tick = function () {
  animate() // 更新旋转角
  draw() // 绘制新的三角形
  requestAnimationFrame(tick)
}

function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    // -1, 1, -1, -1, 1, -1 // 三个顶点
    0, 0.5, -0.5, -0.5, 0.5, -0.5
  ])
  var n = 3
  var vertexBuffer = gl.createBuffer() // 创建 Buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer) // 绑定 Buffer 到 gl 上
  // gl.STATIC_DRAW -> 第一次对缓冲区进行 render 之后，再也不会对缓冲区的顶点数据进行修改
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW) // 往 Buffer 中写入顶点数据
  // 缓冲区数据传 shader 中每个变量中
  // 获得 shader 中需要传递变量的地址
  // 获取 a_Position 在 vertex shader 中的地址
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0) // 指定一个顶点 attributes 数组中，顶点 attributes 变量的数据格式和位置
  // 启用 a_Position 变量
  gl.enableVertexAttribArray(a_Position) // 打开属性数组列表中指定索引处的通用顶点属性数组
  return n
}

// 通过 Buffer 往 vertex shader 中传递顶点数据
var n = initVertexBuffers(gl)
// 1. 将画布上现有的绘制结果清空，添加背景色
gl.clearColor(0, 0, 0, 1)

// 往 vertex shader 中传递矩阵
var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix')
var modelMatrix = new Matrix4()

// 更新旋转角
function animate() {  
  var now = Date.now()
  var duration = now - g_last
  g_last = now
  currentAngle = currentAngle + duration / 1000 * 180
}

// 绘制
function draw() {
  // modelMatrix.setRotate(currentAngle, 1, 0, 0) // 绕 x 轴旋转
  modelMatrix.setRotate(currentAngle, 0, 1, 0) // 绕 y 轴旋转
  // modelMatrix.setRotate(currentAngle, 0, 0, 1) // 绕 z 轴旋转
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements) // 传递到 shader 中
  // 拿到设置的 clearColor 进行清除
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES, 0, n)
}

// draw()
tick()
