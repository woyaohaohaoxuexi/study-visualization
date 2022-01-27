<template>
  <div class=''>
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script>
import { createShader, createProgram } from './util'
export default {
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {
    const canvas = this.$refs.canvas
    canvas.width = 800
    canvas.height = 600
    const gl = canvas.getContext('webgl')

    const vertex = `
        // 一个属性变量，将会从缓冲中读取数据
        attribute vec4 a_position;

        void main() {
          // gl_Position 是一个顶点着色器主要设置的变量
          gl_Position = a_position;
        }
      `

    const fragment = `
        precision mediump float;

        void main() {
          gl_FragColor = vec4(1, 0, 0.5, 1);
        }
      `

    // 生成一个顶点着色器对象
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertex)
    // 生成一个片断着色器对象
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragment)
    // 根据两个着色器对象生成一个 GLSL　着色程序
    const program = createProgram(gl, vertexShader, fragmentShader)

    // 接下来为着色程序提供数据
    // 刚才创建的着色程序只有一个输入值 a_positon。就为这个变量赋值就可以了，
    // 先找到这个属性值在刚才的着色程序中的位置。
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')

    // 属性值需要从缓冲中取值，所以我们创建一个缓冲
    const positionBuffer = gl.createBuffer()

    // WebGl 可以通过绑定点操控全局范围内的许多数据，可以把绑定点想象成一个 WebGL 内部的全局变量。
    // 首先绑定一个数据源到绑定点，然后就可以通过引用绑定点指向数据源（把数据复制到绑定点，数据源就可以获取数据了）。
    // 接下来绑定位置信息缓冲（下面的绑定点是 ARRAY_BUFFER）ARRAY_BUFFER 是一个顶点缓冲类型
    // 把刚才创建的缓冲绑定到一个绑定点上。
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    // 通过绑定点向缓冲中存放数据
    // 定义三个二维坐标点
    const positions = [
      0, 0,
      0, 0.5,
      0.7, 0
    ]
    // WebGL 需要强类型数据，所以 new Float32Array() 创建了 32 位浮点类型数据序列，并从 positions 中复制数据到这个序列。
    // 然后 gl.buffrData() 复制这些数据到 GPU 的 positionBuffer 对象上。因为上一步把 positonBuffer 绑定到了绑定点上。
    // 最后一个参数gl.STATIC_DRAW是提示WebGL我们将怎么使用这些数据。WebGL会根据提示做出一些优化。
    // gl.STATIC_DRAW提示WebGL我们不会经常改变这些数据
    // 把数据通过绑定点复制到刚才创建的缓冲中。
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
    // 在此之上的代码是 初始化代码。这些代码在页面加载时只会运行一次。 接下来的代码是渲染代码，而这些代码将在我们每次要渲染或者绘制时执行。

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    // 清除画布现有内容
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program)

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    var size = 2
    var type = gl.FLOAT
    var normalize = false
    var stride = 0

    var offset = 0
    // 告诉 WebGL 如何解析顶点数据。看下各参数：
    // 1. 指定要配置的顶点属性
    // 2. 指定每次迭代运行提前的顶点数据数量，顶点属性有两个值组成，所以大小是 2
    // 3. 指定数据的类型，这里是 gl.FLOAT
    // 4. 是否希望数据被标准化（normalize），如果设置为 true 值就会被映射到 0 - 1 之间。
    // 5. 这个参数是步长，每次迭代运行运动多少内存到下一个数据开始（移动单位量 * 每个单位占用内存）。如果数组是紧密排列的可以设置为 0。
    // 6. 表示位置数据在缓冲中起始位置的偏移量。这里位置数据在数组的开头，所以设置为 0。
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)
    // 每个顶点属性从一个顶点缓冲数据对象管理的内存中获取数据， 而具体是从哪个顶点缓冲数据对象中取数据，则是通过在调用
    // gl.vertexAttribPointer() 这个函数时绑定到 ARRAY_BUFFER 的 缓冲数据对象决定的。

    // 启用顶点着色器中定义的这个顶点属性。顶点属性默认时禁用的。
    gl.enableVertexAttribArray(positionAttributeLocation)

    var primitiveType = gl.TRIANGLES
    var count = 3
    // 开始绘制图形。看下参数
    // 1. primitiveType 图元类型
    // 2. 指定从哪个点开始绘制
    // 3. 指定绘制需要使用到多少个点。设置多少个点，顶点着色器就会执行几次
    gl.drawArrays(primitiveType, offset, count)
  },
  methods: {

  },
  components: {

  },
}
</script>

<style scoped lang="scss">
.canvas {
  border: 1px solid #aaa;
}
</style>
