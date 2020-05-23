var canvas = document.getElementById('myCanvas')
var gl = canvas.getContext('webgl')

var program = gl.createProgram()

var VSHADER_SOURCE, FSHADER_SOURCE

VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'attribute vec4 a_Normal;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'uniform vec3 u_LightColor;\n' +
  'uniform vec3 u_LightColorAmbient;\n' +
  'uniform vec3 u_LightPosition;\n' +
  'uniform vec3 u_ViewDir;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
  '  vec3 normal = normalize(vec3(a_Normal));\n' +
  '  vec3 lightDirection = normalize(vec3(a_Position) - u_LightPosition);\n' +
  '  float cos = max(dot(-lightDirection, normal), 0.0);\n' +
  '  vec3 diffuse = u_LightColor * a_Color.rgb * cos;\n' +
  '  vec3 ambient = u_LightColorAmbient * a_Color.rgb;\n' +
  '  vec3 nDotLight = normal * dot(normal, lightDirection);\n' +
  '  vec3 r = lightDirection - nDotLight - nDotLight;\n' +
  '  float rDotView = max(dot(r, u_ViewDir), 0.0);\n' +
  '  float shininess = 3.0;\n' +
  '  float k = 1.0;\n' +
  '  vec3 specular = k * pow(rDotView, shininess) * a_Color.rgb;\n' +
  '  v_Color = vec4(diffuse + ambient + specular, a_Color.a);\n' +
  '}\n';

FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
  '}\n';

var vertexShader, fragmentShader

function createShader(gl, sourceCode, type) {
  // create shader
  var shader = gl.createShader(type)
  gl.shaderSource(shader, sourceCode)
  gl.compileShader(shader)
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  return shader
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

function initVertexBuffers(gl) {
  var SPHERE_DIV = 13;
  var aj, sj, cj, ai, si, ci;
  var positions = [];
  var colors = [];
  var indices = [];
  // Generate coordinates
  for (j = 0; j <= SPHERE_DIV; j++) {
    aj = j * Math.PI / SPHERE_DIV;
    sj = Math.sin(aj);
    cj = Math.cos(aj);
    for (i = 0; i <= SPHERE_DIV; i++) {
      ai = i * 2 * Math.PI / SPHERE_DIV;
      si = Math.sin(ai);
      ci = Math.cos(ai);

      positions.push(si * sj);  // X
      positions.push(cj);       // Y
      positions.push(ci * sj);  // Z

      colors.push(1.0);
      colors.push(0.0);
      colors.push(0.0);
    }
  }

  // Generate indices
  for (j = 0; j < SPHERE_DIV; j++) {
    for (i = 0; i < SPHERE_DIV; i++) {
      p1 = j * (SPHERE_DIV + 1) + i;
      p2 = p1 + (SPHERE_DIV + 1);

      indices.push(p1);
      indices.push(p2);
      indices.push(p1 + 1);

      indices.push(p1 + 1);
      indices.push(p2);
      indices.push(p2 + 1);
    }
  }

  // Create a buffer object
  var indexBuffer = gl.createBuffer();

  initArrayBuffer(gl, new Float32Array(positions), 3, gl.FLOAT, 'a_Position')
  initArrayBuffer(gl, new Float32Array(colors), 3, gl.FLOAT, 'a_Color')
  initArrayBuffer(gl, new Float32Array(positions), 3, gl.FLOAT, 'a_Normal')

  // Write the indices to the buffer object
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

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

function normalizeVector(vector) {
  var len = Math.sqrt(vector[0] ** 2 + vector[1] ** 2 + vector[2] ** 2)
  return [vector[0] / len, vector[1] / len, vector[2] / len]
}


// write the positions of vertices to a vertex shader
var n = initVertexBuffers(gl)

gl.clearColor(0, 0, 0, 1)

gl.enable(gl.DEPTH_TEST);

// Get the storage location of u_MvpMatrix
var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');

// Set the eye point and the viewing volume
var mvpMatrix = new Matrix4();
mvpMatrix.setPerspective(30, 1, 1, 100);
mvpMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);
gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

// set directional light
var u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor');
gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);

var u_LightColorAmbient = gl.getUniformLocation(gl.program, 'u_LightColorAmbient');
gl.uniform3f(u_LightColorAmbient, 0.2, 0.2, 0.2);

var u_LightPosition = gl.getUniformLocation(gl.program, 'u_LightPosition');
gl.uniform3f(u_LightPosition, 1.15, 2.0, 1.75);

var viewDir = normalizeVector([1.15, 2.0, 1.75]);
var u_ViewDir = gl.getUniformLocation(gl.program, 'u_ViewDir');
gl.uniform3f(u_ViewDir, viewDir[0], viewDir[1], viewDir[2]);

function draw() {
  // Clear color and depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Draw the cube
  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);

}

tick()