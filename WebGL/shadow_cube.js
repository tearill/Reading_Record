var canvas = document.getElementById('myCanvas')
var gl = canvas.getContext('webgl')

var SHADOW_VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_rotateMatrix;\n' +
  'void main() {\n' +
  '  gl_Position = (a_Position.y >= -1.0) ? (u_MvpMatrix * u_rotateMatrix * a_Position) : (u_MvpMatrix * a_Position);\n' +
  '}\n';

// Fragment shader program for generating a shadow map
var SHADOW_FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'void main() {\n' +
  '  gl_FragColor = vec4(gl_FragCoord.z, 0.0, 0.0, 0.0);\n' + // Write the z-value in R
  '}\n';

var VSHADER_SOURCE, FSHADER_SOURCE

VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Normal;\n' +
  'attribute vec2 a_TexCoord;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_rotateMatrix;\n' +
  'uniform mat4 u_MvpMatrixFromLight;\n' +
  'varying vec4 v_Normal;\n' +
  'varying vec2 v_TexCoord;\n' +
  'varying vec4 v_PositionFromLight;\n' +
  'void main() {\n' +
  '  v_TexCoord = a_TexCoord;\n' +
  '  gl_Position = (a_Position.y >= -1.0) ? (u_MvpMatrix * u_rotateMatrix * a_Position) : (u_MvpMatrix * a_Position);\n' +
  '  v_Normal = (a_Position.y >= -1.0) ? (u_rotateMatrix * a_Normal) : a_Normal;\n' +
  '  v_PositionFromLight = u_MvpMatrixFromLight * a_Position;\n' +
  '}\n';

FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform vec3 u_LightColor;\n' +
  'uniform vec3 u_LightDir;\n' +
  'uniform vec3 u_LightColorAmbient;\n' +
  'uniform sampler2D u_Sampler;\n' +
  'uniform sampler2D u_ShadowMap;\n' +
  'varying vec4 v_Normal;\n' +
  'varying vec2 v_TexCoord;\n' +
  'varying vec4 v_PositionFromLight;\n' +
  'void main() {\n' +
  '  vec3 shadowCoord = (v_PositionFromLight.xyz/v_PositionFromLight.w)/2.0 + 0.5;\n' +
  '  vec4 rgbaDepth = texture2D(u_ShadowMap, shadowCoord.xy);\n' +
  '  float depth = rgbaDepth.r;\n' + // Retrieve the z-value from R
  '  float visibility = (shadowCoord.z > depth + 0.005) ? 0.5 : 1.0;\n' +
  '  vec4 s_Color = texture2D(u_Sampler, v_TexCoord);\n' +
  '  vec3 normal = normalize(vec3(v_Normal));\n' +
  '  float cos = max(dot(u_LightDir, normal), 0.0);\n' +
  '  vec3 diffuse = u_LightColor * s_Color.rgb * cos;\n' +
  '  vec3 ambient = u_LightColorAmbient * s_Color.rgb;\n' +
  '  vec4 r_Color = vec4(diffuse + ambient, s_Color.a);\n'+
  '  gl_FragColor = vec4(r_Color.rgb * visibility, r_Color.a);\n' +
  '}\n';

var OFFSCREEN_WIDTH = 2048, OFFSCREEN_HEIGHT = 2048;

function createShader (gl, sourceCode, type) {
  // create shader
  var shader = gl.createShader(type)
  gl.shaderSource(shader, sourceCode)
  gl.compileShader(shader)
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    var error = gl.getShaderInfoLog(shader);
    console.log('Failed to compile shader: ' + error);
    gl.deleteShader(shader);
    return null;
  }
  return shader
}

function createProgram (gl, vSource, fSource) {
  var program = gl.createProgram()
  // define vertex shader
  var vertexShader = createShader(gl, vSource, gl.VERTEX_SHADER)
  // define frament shader
  var fragmentShader = createShader(gl, fSource, gl.FRAGMENT_SHADER)

  // attach shader to program
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)

  // link program to context
  gl.linkProgram(program)

  return program
}

var normalProgram = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE)

gl.useProgram(normalProgram)
gl.program = normalProgram

var shadowProgram = createProgram(gl, SHADOW_VSHADER_SOURCE, SHADOW_FSHADER_SOURCE)
var tick = function () {
  draw()
  requestAnimationFrame(tick)
}

function initAttributeVariable(gl, a_attribute, buffer) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(a_attribute, buffer.num, buffer.type, false, 0, 0);
  gl.enableVertexAttribArray(a_attribute);
}

function initVertexBuffers (gl) {
    // Create a buffer object
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
      0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,
    ]);
    
    var indices = new Uint8Array([       // Indices of the vertices
      0, 1, 2,   0, 2, 3,    // front
      4, 5, 6,   4, 6, 7,    // right
      8, 9,10,   8,10,11,    // up
      12,13,14,  12,14,15,    // left
      16,17,18,  16,18,19,    // down
      20,21,22,  20,22,23,    // back
      24,25,26,  24,26,27,
      28,29,30,  28,30,31,
      32,33,34,  32,34,35,
      36,37,38,  36,38,39,
      40,41,42,  40,42,43,
      44,45,46,  44,46,47
    ]);
    
    var verticesTexCoords = new Float32Array([
    // Vertex coordinates, texture coordinate
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
      0.0,0.0, 1.0,0.0, 1.0,1.0, 0.0,1.0,
    ]);

    var o = new Object();
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    o.indexBuffer = indexBuffer;
    o.positionBuffer = initArrayBuffer(gl, vertices, 3, gl.FLOAT, gl.program);
    o.normalBuffer = initArrayBuffer(gl, normals, 3, gl.FLOAT, gl.program)
    o.texCoordBuffer = initArrayBuffer(gl, verticesTexCoords, 2, gl.FLOAT, gl.program)

    var shadowIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shadowIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    o.shadowIndexBuffer = shadowIndexBuffer;
    o.shadowPositionBuffer = initArrayBuffer(gl, vertices, 3, gl.FLOAT, shadowProgram);

    o.n = indices.length;
    return o;
}

function initArrayBuffer(gl, data, num, type, program) {
    // Create a buffer object
    var buffer = gl.createBuffer();
    if (!buffer) {
      console.log('Failed to create the buffer object');
      return false;
    }
    // Write date into the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
    buffer.num = num;
    buffer.type = type;

    return buffer;
}

function normalizeVector (vector) {
    var len = Math.sqrt(vector[0]**2 + vector[1]**2 + vector[2]**2)
    return [vector[0] / len, vector[1] / len, vector[2] / len]
}
  

// write the positions of vertices to a vertex shader
var o = initVertexBuffers(gl)

var n = o.n

initTextures(gl, n)

var fbo = initFramebufferObject(gl);

gl.activeTexture(gl.TEXTURE0); // Set a texture object to the texture unit

gl.bindTexture(gl.TEXTURE_2D, fbo.texture);

gl.clearColor(0, 0, 0, 1)
gl.enable(gl.DEPTH_TEST);

// Get the storage location of u_MvpMatrix
var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
var u_rotateMatrix = gl.getUniformLocation(gl.program, 'u_rotateMatrix');
var u_MvpMatrixFromLight = gl.getUniformLocation(gl.program, 'u_MvpMatrixFromLight');
// Set the eye point and the viewing volume
var mvpMatrix = new Matrix4();
mvpMatrix.setPerspective(30, 1, 1, 100);
mvpMatrix.lookAt(6, 8, 12, 0, 0, 0, 0, 1, 0);
gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

var u_ShadowMvpMatrix = gl.getUniformLocation(shadowProgram, 'u_MvpMatrix');
var u_ShadowRotateMatrix = gl.getUniformLocation(shadowProgram, 'u_rotateMatrix');
var shadowMvpMatrix =  new Matrix4();
shadowMvpMatrix.setPerspective(30, 1, 1, 100);
shadowMvpMatrix.lookAt(0, 21, 0, 0, 0, 0, 0, 0, 1);

gl.uniformMatrix4fv(u_MvpMatrixFromLight, false, shadowMvpMatrix.elements)

var rotateMatrix = new Matrix4();

// set directional light
var u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor');
gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);

var dir = normalizeVector([0.0, 10.0, 1.0]);
var u_LightDir = gl.getUniformLocation(gl.program, 'u_LightDir');
gl.uniform3f(u_LightDir, dir[0], dir[1], dir[2]);

var u_LightColorAmbient = gl.getUniformLocation(gl.program, 'u_LightColorAmbient');
gl.uniform3f(u_LightColorAmbient, 0.2, 0.2, 0.2);

var u_ShadowMap = gl.getUniformLocation(gl.program, 'u_ShadowMap');

var positionLocation = gl.getAttribLocation(gl.program, 'a_Position');
var normalLocation = gl.getAttribLocation(gl.program, 'a_Normal');
var texCoordLocation = gl.getAttribLocation(gl.program, 'a_TexCoord');
var shadowPositionLocation = gl.getAttribLocation(shadowProgram, 'a_Position');
var g_last = Date.now()

function draw () {
    var now = Date.now()
    var duration = now - g_last
    g_last = now
    // Clear color and depth buffer
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    rotateMatrix.rotate(duration / 5000 * 180, 0, 1, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.viewport(0, 0, OFFSCREEN_HEIGHT, OFFSCREEN_HEIGHT);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);   // Clear FBO
    gl.useProgram(shadowProgram); // Set shaders for generating a shadow map
    initAttributeVariable(gl, shadowPositionLocation, o.shadowPositionBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, o.shadowIndexBuffer);
    gl.uniformMatrix4fv(u_ShadowRotateMatrix, false, rotateMatrix.elements);
    gl.uniformMatrix4fv(u_ShadowMvpMatrix, false, shadowMvpMatrix.elements);    
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);               // Change the drawing destination to color buffer
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);    // Clear color and depth buffer
    gl.useProgram(gl.program);
    initAttributeVariable(gl, normalLocation, o.normalBuffer);
    initAttributeVariable(gl, positionLocation, o.positionBuffer);
    initAttributeVariable(gl, texCoordLocation, o.texCoordBuffer);    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, o.indexBuffer);

    gl.uniform1i(u_ShadowMap, 0);  // Pass 0 because gl.TEXTURE0 is enabledする
    gl.uniformMatrix4fv(u_rotateMatrix, false, rotateMatrix.elements);
    // Draw the cube
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);

}


function initTextures(gl, n) {
  var texture = gl.createTexture();   // Create a texture object
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }

  // Get the storage location of u_Sampler
  var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
  if (!u_Sampler) {
    console.log('Failed to get the storage location of u_Sampler');
    return false;
  }
  var image = new Image();  // Create the image object
  if (!image) {
    console.log('Failed to create the image object');
    return false;
  }
  // Register the event handler to be called on loading an image
  image.onload = function(){ loadTexture(gl, n, texture, u_Sampler, image); };
  // Tell the browser to load an image
  image.src = './wall.jpg';

  return true;
}

function loadTexture(gl, n, texture, u_Sampler, image) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Enable texture unit0
  gl.activeTexture(gl.TEXTURE1);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  
  // Set the texture unit 0 to the sampler
  gl.uniform1i(u_Sampler, 1);

  tick()
}

function initFramebufferObject(gl) {
  var framebuffer, texture, depthBuffer;

  // 校验
  var error = function() {
    if (framebuffer) gl.deleteFramebuffer(framebuffer);
    if (texture) gl.deleteTexture(texture);
    if (depthBuffer) gl.deleteRenderbuffer(depthBuffer);
    return null;
  }

  // 创建帧缓冲区
  framebuffer = gl.createFramebuffer();
  if (!framebuffer) {
    console.log('Failed to create frame buffer object');
    return error();
  }

  // Create a texture object and set its size and parameters
  texture = gl.createTexture(); // Create a texture object
  if (!texture) {
    console.log('Failed to create texture object');
    return error();
  }
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  // Create a renderbuffer object and Set its size and parameters
  depthBuffer = gl.createRenderbuffer(); // Create a renderbuffer object
  if (!depthBuffer) {
    console.log('Failed to create renderbuffer object');
    return error();
  }
  gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);

  // Attach the texture and the renderbuffer object to the FBO
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);

  var e = gl.checkFramebufferStatus(gl.FRAMEBUFFER); // 检查帧缓冲区状态
  if (gl.FRAMEBUFFER_COMPLETE !== e) {
    console.log('Frame buffer object is incomplete: ' + e.toString());
    return error();
  }

  framebuffer.texture = texture; // keep the required object

  // Unbind the buffer object
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindRenderbuffer(gl.RENDERBUFFER, null);

  return framebuffer;
}
