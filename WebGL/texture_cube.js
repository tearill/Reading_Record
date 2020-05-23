var canvas = document.getElementById('myCanvas')
var gl = canvas.getContext('webgl')

var program = gl.createProgram()

var VSHADER_SOURCE, FSHADER_SOURCE

VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Normal;\n' +
  'attribute vec2 a_TexCoord;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_RotateMatrix;\n' +
  'varying vec4 v_Normal;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  '  gl_Position = (a_Position.y >= -1.0) ? (u_MvpMatrix * u_RotateMatrix * a_Position) : (u_MvpMatrix * a_Position);\n' +
  '  v_Normal = (a_Position.y >= -1.0) ? (u_RotateMatrix * a_Normal) : a_Normal;\n' +
  '  v_TexCoord = a_TexCoord;\n' +
  '}\n';

FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform vec3 u_LightColor;\n' +
  'uniform vec3 u_LightDir;\n' +
  'uniform vec3 u_LightColorAmbient;\n' +
  'uniform sampler2D u_Sampler;\n' +
  'varying vec4 v_Normal;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  '  vec4 t_Color = texture2D(u_Sampler, v_TexCoord);\n' +
  '  vec3 normal = normalize(vec3(v_Normal));\n' +
  '  float cos = max(dot(u_LightDir, normal), 0.0);\n' + 
  '  vec3 diffuse = u_LightColor * t_Color.rgb * cos;\n' +
  '  vec3 ambient = u_LightColorAmbient * t_Color.rgb;\n' +
  '  vec4 resultColor = vec4(diffuse + ambient, t_Color.a);\n' +
  '  gl_FragColor = resultColor;\n' +
  '}\n';

var vertexShader, fragmentShader

function createShader (gl, sourceCode, type) {
  // create shader
  var shader = gl.createShader(type)
  gl.shaderSource(shader, sourceCode)
  gl.compileShader(shader)
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    var error = gl.getShaderInfoLog(shader);
    console.log('Failed to compile shader : ' + error);
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

// define vertex shader
vertexShader = createShader(gl, VSHADER_SOURCE, gl.VERTEX_SHADER)
// define frament shader
fragmentShader = createShader(gl, FSHADER_SOURCE, gl.FRAGMENT_SHADER)

// attach shader to program
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)

// link program to context
gl.linkProgram(program)
gl.useProgram(program)
gl.program = program

var tick = function () {
  draw()
  requestAnimationFrame(tick)
}

function initVertexBuffers (gl) {
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
    1.0,-1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0, 1.0,-1.0,   1.0, 1.0,-1.0,     // v4-v7-v6-v5 back

    3.0, -2.0, 3.0,  -3.0, -2.0, 3.0,  -3.0, -4.0, 3.0,   3.0, -4.0, 3.0,    // v0-v1-v2-v3 front
    3.0, -2.0, 3.0,   3.0, -4.0, 3.0,   3.0, -4.0, -3.0,   3.0, -2.0, -3.0,    // v0-v3-v4-v5 right
    3.0, -2.0, 3.0,   3.0, -2.0, -3.0,  -3.0, -2.0, -3.0,  -3.0, -2.0, 3.0,    // v0-v5-v6-v1 up
    -3.0, -2.0, 3.0,  -3.0, -2.0, -3.0,  -3.0, -4.0, -3.0,  -3.0, -4.0, 3.0,    // v1-v6-v7-v2 left
    -3.0, -4.0, -3.0,   3.0, -4.0, -3.0,   3.0, -4.0, 3.0,  -3.0, -4.0, 3.0,    // v7-v4-v3-v2 down
    3.0, -4.0, -3.0,  -3.0, -4.0, -3.0,  -3.0, -2.0, -3.0,   3.0, -2.0, -3.0,     // v4-v7-v6-v5 back
  ]);

  // 每个顶点的法向量
  var normals = new Float32Array([
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
    -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
    0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
    0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,

    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
    -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
    0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
    0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0
  ]);

  var indices = new Uint8Array([       // Indices of the vertices
    0, 1, 2,   0, 2, 3,    // front
    4, 5, 6,   4, 6, 7,    // right
    8, 9,10,   8,10,11,    // up
    12,13,14,  12,14,15,    // left
    16,17,18,  16,18,19,    // down
    20,21,22,  20,22,23,     // back,
    24,25,26,  24,26,27,
    28,29,30,  28,30,31,
    32,33,34,  32,34,35,
    36,37,38,  36,38,39,
    40,41,42,  40,42,43,
    44,45,46,  44,46,47
  ]);

  var verticesTexCoords = new Float32Array([
    1.0,1.0, 0.0,1.0, 0.0,0.0, 1.0,0.0, 
    0.0,1.0, 0.0,0.0, 1.0,0.0, 1.0,1.0,
    1.0,0.0, 1.0,1.0, 0.0,1.0, 0.0,0.0,
    1.0,1.0, 0.0,1.0, 0.0,0.0, 1.0,0.0,
    0.0,0.0, 1.0,0.0, 1.0,1.0, 0.0,1.0,
    0.0,0.0, 1.0,0.0, 1.0,1.0, 0.0,1.0,
    1.0,1.0, 0.0,1.0, 0.0,0.0, 1.0,0.0, 
    0.0,1.0, 0.0,0.0, 1.0,0.0, 1.0,1.0,
    1.0,0.0, 1.0,1.0, 0.0,1.0, 0.0,0.0,
    1.0,1.0, 0.0,1.0, 0.0,0.0, 1.0,0.0,
    0.0,0.0, 1.0,0.0, 1.0,1.0, 0.0,1.0,
    0.0,0.0, 1.0,0.0, 1.0,1.0, 0.0,1.0
  ])

  // Create a buffer object
  var indexBuffer = gl.createBuffer();
  
  initArrayBuffer(gl, vertices, 3, gl.FLOAT, 'a_Position')
  initArrayBuffer(gl, normals, 3, gl.FLOAT, 'a_Normal')
  initArrayBuffer(gl, verticesTexCoords, 2, gl.FLOAT, 'a_TexCoord')

  // Write the indices to the buffer object
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
}

function initArrayBuffer(gl, data, num, type, attribute) {
    // Create a buffer object
    var buffer = gl.createBuffer();
    if (!buffer) {
      console.log('Failed to create the buffer object');
      return false;
    }
    // Write date into the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  　// Assign the buffer object to the attribute variable
    var a_attribute = gl.getAttribLocation(gl.program, attribute);
    if (a_attribute < 0) {
      console.log('Failed to get the storage location of ' + attribute);
      return false;
    }
    gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
    // Enable the assignment of the buffer object to the attribute variable
    gl.enableVertexAttribArray(a_attribute);
  
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  
    return true;
}

function normalizeVector (vector) {
    var len = Math.sqrt(vector[0]**2 + vector[1]**2 + vector[2]**2)
    return [vector[0] / len, vector[1] / len, vector[2] / len]
}
  

// write the positions of vertices to a vertex shader
var n = initVertexBuffers(gl)

initTexture(gl, n)

gl.clearColor(0, 0, 0, 1)

gl.enable(gl.DEPTH_TEST);

// Get the storage location of u_MvpMatrix
var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');

// Set the eye point and the viewing volume
var mvpMatrix = new Matrix4();
mvpMatrix.setPerspective(30, 1, 1, 100);
mvpMatrix.lookAt(0, 0, 20, 0, 0, 0, 0, 1, 0);

gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

var u_RotateMatrix = gl.getUniformLocation(gl.program, 'u_RotateMatrix');

var rotateMatrix = new Matrix4();

// 设置入射光
var u_LightColor = gl.getUniformLocation(gl.program, "u_LightColor");
gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);

var dir = normalizeVector([0.5, 3.0, 4.0]);
var u_LightDir = gl.getUniformLocation(gl.program, "u_LightDir");
gl.uniform3f(u_LightDir, dir[0], dir[1], dir[2]);

var u_LightColorAmbient = gl.getUniformLocation(gl.program, "u_LightColorAmbient");
gl.uniform3f(u_LightColorAmbient, 0.2, 0.2, 0.2);

var g_last = Date.now();

function draw () {
  // Pass the model view projection matrix to u_MvpMatrix

  var now = Date.now();
  var duration = now - g_last;
  g_last = now;

  rotateMatrix.rotate(duration / 5000 * 180, 0, 1, 0);

  gl.uniformMatrix4fv(u_RotateMatrix, false, rotateMatrix.elements);
  
  // Clear color and depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Draw the cube
  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);

}

function initTexture(gl, n) {
  var texture = gl.createTexture();

  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }

  var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');

  if (!u_Sampler) {
    console.log('Failed to ge the storage location of u_Sampler');
    return false;
  }

  var image = new Image();

  if (!image) {
    console.log('Failed to create the image object');
    return;
  }

  image.onload = function () {
    loadTexture(gl, n, texture, u_Sampler, image);
  }

  image.src = './wall.jpg';

  // return false;
}

function loadTexture (gl, n, texture, u_Sampler, image) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  gl.uniform1i(u_Sampler, 1);

  tick()
}
