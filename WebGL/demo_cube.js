var canvas = document.getElementById('myCanvas')
var gl = canvas.getContext('webgl') // 拿到 context 才能在 canvas 上进行绘制
console.log(gl)
var program = gl.createProgram()

var VSHADER_SOURCE, FSHADER_SOURCE
VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'attribute vec4 a_Normal;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
  '}\n'

FSHADER_SOURCE =
  'void main () {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
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
  draw() // 绘制新的三角形
  requestAnimationFrame(tick)
}

function initVertexBuffers(gl) {
  // Create a cube
    //    v6----- v5
    //   /|      /|
    //  v1------v0|
    //  | |     | |
    //  | |v7---|-|v4
    //  |/      |/
    //  v2------v3

  var vertices = new Float32Array([   // Vertex coordinates
    1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0,-1.0, 1.0,   1.0,-1.0, 1.0,    // v0-v1-v2-v3 front
    1.0, 1.0, 1.0,   1.0,-1.0, 1.0,   1.0,-1.0,-1.0,   1.0, 1.0,-1.0,    // v0-v3-v4-v5 right
    1.0, 1.0, 1.0,   1.0, 1.0,-1.0,  -1.0, 1.0,-1.0,  -1.0, 1.0, 1.0,    // v0-v5-v6-v1 up
    -1.0, 1.0, 1.0,  -1.0, 1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0,-1.0, 1.0,    // v1-v6-v7-v2 left
    -1.0,-1.0,-1.0,   1.0,-1.0,-1.0,   1.0,-1.0, 1.0,  -1.0,-1.0, 1.0,    // v7-v4-v3-v2 down
    1.0,-1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0, 1.0,-1.0,   1.0, 1.0,-1.0     // v4-v7-v6-v5 back
  ]);

  // 每个顶点的法向量
  var normals = new Float32Array([
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
    -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
    0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
    0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0
  ]);

  var colors = new Float32Array([     // Colors
    1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  // v0-v1-v2-v3 front(white)
    1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  // v0-v3-v4-v5 right(white)
    1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  // v0-v5-v6-v1 up(white)
    1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  // v1-v6-v7-v2 left(white)
    1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  // v7-v4-v3-v2 down(white)
    1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0   // v4-v7-v6-v5 back(white)
  ]);

  var indices = new Uint8Array([       // Indices of the vertices
    0, 1, 2,   0, 2, 3,    // front
    4, 5, 6,   4, 6, 7,    // right
    8, 9,10,   8,10,11,    // up
    12,13,14,  12,14,15,    // left
    16,17,18,  16,18,19,    // down
    20,21,22,  20,22,23     // back
  ]);

  var indexBuffer = gl.createBuffer();

  initArrayBuffer(gl, vertices, 3, gl.FLOAT, 'a_Position')
  initArrayBuffer(gl, colors, 3, gl.FLOAT, 'a_Color')
  initArrayBuffer(gl, normals, 3, gl.FLOAT, 'a_Normal')

  // 传递顶点对应的索引数组
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)

  return indices.length
}

function initArrayBuffer(gl, data, num, type, attribute) {
  var buffer = gl.createBuffer()
  if (!buffer) {
    console.log('Failed to create the buffer object')
    return false
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)

  var a_attribute = gl.getAttribLocation(gl.program, attribute)

  if (a_attribute < 0) {
    console.log('Failed to get the storage location of ' + attribute)
    return false
  }

  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0)
  // 开启顶点数组，将 a_attribute 的 location 数据传进去
  gl.enableVertexAttribArray(a_attribute)

  gl.bindBuffer(gl.ARRAY_BUFFER, null); // 将之前绑定的 Buffer 卸载
}

// 通过 Buffer 往 vertex shader 中传递顶点数据
var n = initVertexBuffers(gl)
// 1. 将画布上现有的绘制结果清空，添加背景色
gl.clearColor(0, 0, 0, 1)

gl.enable(gl.DEPTH_TEST) // 深度检测
var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix')

var mvpMatrix = new Matrix4()
mvpMatrix.setPerspective(30, 1, 1, 100)
mvpMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0)
gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements) // 传递到 shader 中

// 绘制
function draw() {
  // 清空场景中的内容
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  // 画出 cube
  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0)
}

// draw()
tick()
