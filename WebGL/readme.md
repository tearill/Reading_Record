## WebGL  
- 什么是 WebGL  
  1. GPU &　CPU  
  2. GPU 的业务场景  
  3. 如何对 GPU 编程  

- WebGL 是浏览器提供的一套完整的接口，通过这套接口，可以使浏览器展示 3D 模型和场景  
  /\\
  | | 封装  
  JavaScript 绑定 -> OpenGL ES 封装，下层与 OpenGL ES 通信，上层提供 WebGL 接口  
  /\\
  | | 连接  
  OpenGL ES 标准 -> 浏览器实现了 OpenGL ES 规范，通过 OpenGL ES  可以直接通过 API 调用显卡，实现显卡的调用功能  

- WebGL 的业务场景  
  游戏、3D 多维数据模型、3D 试衣等  

- 浏览器支持  
  目前基本所有的浏览器对于 WebGL 有比较好的支持  

- GPU & CPU  
  CPU 有 控制单元和比较多缓存能力，ALU 核心计算单元只有四个 -> **更适合执行复杂的，有控制逻辑的指令集**  
  GPU 没有复杂的控制能力，也没有缓存层，但是有非常多的 ALU 计算单元 -> **更适合执行比较多并且重复的指令集**  
  5% 左右的计算密集型相关的功能跑在 GPU 上，利用 GPU 的多核编程能力让运算可以更快的进行  
  通过 GPU 加速提升整个应用的运算能力  

- GPU 的业务场景  
  1. 图像处理  
  2. 深度学习 -> 并行网络计算  
  3. 3D 游戏渲染  
  4. 大数据  

- 如何对 GPU 编程  
  类型          | API
  ------------- | -------------
  WebGL         | glTranslate / glRotatef
  GLSL          | 顶点着色器 ——　gl_Position / 片元着色器 ——　gl_FragColor  

- WebGL 渲染管线  
  **JavaScript**  
  | | 利用显存将相关的参数数据传输到顶点着色器和片元着色器  
  \\/ Buffer  
  **Vertex Shader** -> 顶点着色器，根据位置进行并行计算，计算得到各个顶点(可能有一些变换：旋转、角度等)所处的位置(gl_Position)  
  | |  
  \\/  
  Primitive Assembly -> 图元装配，将顶点根据 primitive（原始的连接关系），还原出网格结构  
  | |  
  \\/  
  Rasterizer -> 光栅化，计算和设置每个像素的颜色，将屏幕空间的二维顶点和每个顶点的 shading 信息转换为屏幕上的像素   
  | |  
  \\/  
  **Fragment Shader** -> 片元着色器，将光栅化之后的点/像素进行上色(给 gl_FragColor 赋值) -> 显示在屏幕上  
  | |  
  \\/  
  Fragment Operations  
  | |  
  \\/  
  **Frame Buffer** -> 离屏渲染的缓冲区(帧缓冲区)，片元着色器渲染好的数据可以直接在屏幕上显示，也可以进行一定的修改后再在屏幕上进行显示(以纹理 Textures 的形式贴到屏幕上)  

  如果 gl_FragColor 和位置相关，需要从顶点着色器中将相关的颜色(v_color)传递到片元着色器中  
  位置信息在顶点着色器中，如果颜色和位置信息相关，就需要将和位置信息相关联的颜色从顶点着色器传递到片元着色器中  
  通过 **varying** 数据类型传递，定义为 varying 数据类型的变量就可以在片元着色器中拿到(定义同样的一个变量就可以拿到相同的数据)  

- GLSL 中的三种数据类型  
  1. attribute  
    只能在 vertex shader 中使用的变量，一般用来传递顶点数据  
    使用 Buffer 定义，将 Buffer 地址传给顶点着色器，并往对应地址的 Buffer 中传递顶点数据  
  2. uniform  
    常量，不能被 shader 修改的数据，uniform 变量在 vertex 和 fragment 之间声明方式完全一样，可以被两者共享(相当于被两者共享的全局变量)，例如变换矩阵、光线变化相关的参数  
  3. varfying  
    vertex 和 fragment 之间做数据传递使用的  
    像素颜色与顶点坐标坐标值有关，坐标值在 vertex shader 中，需要将颜色计算出来之后传递到 fragment shader 中  
  
- WebGL 中的视角  
  默认视角是沿着 z 轴的负方向望向原点  

## ThreeJS  
ThreeJS 是 WebGL 的封装  
1. Geometries(形状): Circle、Box、Cylinder(柱体)、Sphere(球体)等  
2. Lights(光线): AmbientLight(局部光)、DirectionalLight(平行光)等  
3. Materials(材质): LineDashedMaterial、MeshPhongMaterial 等  
4. Cameras(相机/视角): PerspectiveCamera、OrthographicCamera(正交相机) 等  

- ThreeJS 画图  
  需要 canvas 支持  
  - renderer 渲染器，传递 camera、scene 进行渲染  
  - 建模 mesh  
    建模需要形状(geometry)和材质(material)  