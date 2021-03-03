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
          gl_Position = a_position
        }
      `

      const fragment = `
        precision mediump float;

        void main() {
          gl_FragColor = vec4(1, 0, 0.5, 1)
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
      const positionAttributeLocation = gl.getAttributeLocation(program, 'a_position')

      // 属性值需要从缓冲中取值，所以我们创建一个缓冲
      const positionBuffer = gl.createBuffer()

      // WebGl 可以通过绑定点操控全局范围内的许多数据，可以把绑定点想象成一个 WebGL 内部的全局变量。
      // 首先绑定一个数据源到绑定点，然后就可以通过引用绑定点指向数据源（把数据复制到绑定点，数据源就可以获取数据了）。
      // 接下来绑定位置信息缓冲（下面的绑定点是 ARRAY_BUFFER）
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
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
      // 在此之上的代码是 初始化代码。这些代码在页面加载时只会运行一次。 接下来的代码是渲染代码，而这些代码将在我们每次要渲染或者绘制时执行。  

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
