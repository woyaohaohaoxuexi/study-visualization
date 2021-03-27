<template>
  <div>
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script>
import { createShader, createProgram, m3 } from './utils_two'
export default {
  name: "GLSix",
  data() {
    return {
      gl: null,
      canvas: null
    }
  },
  computed: {
    vertex() {
      return `
        attribute vec2 a_position;
        void main() {
          gl_Position = vec4(a_position, 0, 1.0);
        }
      `
    },
    fragment() {
      return `
        precision mediump float;

        void main() {
          gl_FragColor = vec4(0.8, 0.2, 0.6, 1);
        }
      `
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas
    const { clientWidth, clientHeight } = this.canvas
    this.canvas.width = clientWidth
    this.canvas.height = clientHeight

    this.gl = this.canvas.getContext('webgl')
    this.init()
  },
  methods: {
    // 创建坐标系
    init() {
      const gl = this.gl
      const vertexShader = createShader(gl, gl.VERTEX_SHADER, this.vertex)
      const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, this.fragment)
      const program = createProgram(gl, vertexShader, fragmentShader)
      gl.useProgram(program)

      // 创建缓冲
      const positionBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      const points = [
        -0.5, 0,
        0.5, 0,
        0, -0.5,
        0, 0.5,
        0.49, 0.01,
        0.50, 0,
        0.50, 0,
        0.49, -0.01,
        -0.01, 0.49,
        0, 0.5,
        0, 0.5,
        0.01, 0.49
      ]
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW)

      // 获取
      const positionLocation = gl.getAttribLocation(program, 'a_position')
      gl.enableVertexAttribArray(positionLocation)

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

      gl.drawArrays(gl.LINES, 0, 12)

      this.drawRect()
      // gl.vertexAttribPointer(positionLocation, 2, gl.FlOAT, false, 0, 24)
      // gl.drawArrays(gl.TRIANGLES, 2, gl.FLOAT, false, 0, 0)
    },
    // 绘制矩形
    drawRect() {
      const gl = this.gl
      const vertex = `
        attribute vec2 a_position;
        uniform mat3 u_matrix;
        void main() {
          vec2 position = (u_matrix * vec3(a_position, 1)).xy;
          gl_Position = vec4(position, 0, 1.0);
        }
      `
      const frag = `
        precision mediump float;

        void main() {
          gl_FragColor = vec4(0.5, 0.8, 0.2, 1);
        }
      `

      const vertexShader  = createShader(gl, gl.VERTEX_SHADER, vertex)
      const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, frag)
      const program = createProgram(gl, vertexShader, fragmentShader)
      gl.useProgram(program)
      const positionBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      // 绑定矩形顶点
      const rectPoints = [
        0, 0,
        0, 0.1,
        0.1, 0,
        0.1, 0,
        0, 0.1,
        0.1, 0.1
      ]
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rectPoints), gl.STATIC_DRAW)

      // 获取顶点变量在程序中的位置
      const positionLocation = gl.getAttribLocation(program, 'a_position')
      const matrixLocation = gl.getUniformLocation(program, 'u_matrix')
      // 启用这个变量
      gl.enableVertexAttribArray(positionLocation)

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
      // gl.clear(gl.COLOR_BUFFER_BIT)

      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
      const deg = 45 * Math.PI / 180
      const cosDeg = Math.cos(deg)
      const sinDeg = Math.sin(deg)
      let identity = [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
      ]
      // 旋转矩阵
      const rotationMrx = [
        cosDeg, sinDeg, 0,
        -sinDeg, cosDeg, 0,
        0, 0, 1
      ]
      // 平移矩阵
      const moveMrx = [
        1, 0, 0,
        0, 1, 0,
        0.3, 0.3, 1
      ]

      // 后一个图形的渲染是根据上一个渲染情况来的
      // for (let i = 0; i < 3; i++) {
      //   identity = m3.multiply(identity, rotationMrx)
      //   identity = m3.multiply(identity, moveMrx)
      //   // const mrx1 = m3.multiply(moveMrx, rotationMrx)
      //   // 平移矩阵
      //   gl.uniformMatrix3fv(matrixLocation, false, identity)
      //   gl.drawArrays(gl.TRIANGLES, 0, 6)
      // }
      // const mrx = m3.multiply(rotationMrx, moveMrx)
      // 从右到左变换，先变换第二个参数。
      // const mrx = m3.multiply(moveMrx, rotationMrx)
      // const deg30 = 30 * Math.PI / 180
      // const cos30Deg = Math.cos(deg30)
      // const sin30Deg = Math.sin(deg30)
      // const mrx2 = m3.multiply(mrx, [
      //   cos30Deg, sin30Deg, 0,
      //   -sin30Deg, cos30Deg, 0,
      //   0, 0, 1
      // ])


      const mrx1 = m3.multiply( [
        1, 0, 0,
        0, 1, 0,
        0.05, -0.05, 1
      ], rotationMrx)
      gl.uniformMatrix3fv(matrixLocation, false, mrx1)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }
  }
}
</script>

<style scoped>
.canvas {
  width: 800px;
  height: 800px;
}
</style>