<template>
  <div>
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script>
import { createShader, createProgram } from './utils_two'
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
        -0.75, 0,
        -0.25, 0,
        -0.5, -0.75,
        -0.5, 0.75,
        -0.26, 0.01,
        -0.25, 0,
        -0.25, 0,
        -0.26, -0.01,
        -0.505, 0.73,
        -0.5, 0.75,
        -0.5, 0.75,
        -0.495, 0.73
      ]
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW)

      // 获取
      const positionLocation = gl.getAttribLocation(program, 'a_position')
      gl.enableVertexAttribArray(positionLocation)

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

      gl.drawArrays(gl.LINES, 0, 12)


      // const rectPoints = [
      //   -0.5, 0,
      //   -0.35, 0,
      //   -0.5, 0.15,
      //   -0.5, 0.15,
      //   -0.35, 0.15,
      //   -0.35, 0
      // ]
      // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rectPoints), gl.STATIC_DRAW)
      // gl.drawArrays(gl.TRIANGLES, 2, gl.FLOAT, false, 0, 0)
    }
  }
}
</script>

<style scoped>
.canvas {
  width: 100vw;
  height: 100vh;
}
</style>