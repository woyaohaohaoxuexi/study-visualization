<template>
  <div>
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script>
import { createShader, createProgram, m3 } from './glUtils'
export default {
  name: "GlSeven",
  data() {
    return {
      gl: null
    }
  },
  computed: {
    vertex() {
      return `
        attribute vec4 a_position;
        uniform mat4 u_matrix;

        void main() {
          gl_Position = u_matrix * a_position;
        }
      `
    },
    fragment() {
      return `
        precision mediump float;

        void main() {
          gl_FragColor = vec4(0.5, 0.2, 0.7, 1);
        }
      `
    }
  },
  mounted() {
    const canvas = this.$refs.canvas
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    this.gl = canvas.getContext('webgl')
    this.init()
  },
  methods: {
    init() {
      const gl = this.gl
      const vertexShader = createShader(gl, gl.VERTEX_SHADER, this.vertex)
      const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, this.fragment)
      const program = createProgram(gl, vertexShader, fragmentShader)

      gl.useProgram(program)

      const positionBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        // 左竖
        0,   0,  0,
        30,   0,  0,
        0, 150,  0,
        0, 150,  0,
        30,   0,  0,
        30, 150,  0,

        // 上横
        30,   0,  0,
        100,   0,  0,
        30,  30,  0,
        30,  30,  0,
        100,   0,  0,
        100,  30,  0,

        // 下横
        30,  60,  0,
        67,  60,  0,
        30,  90,  0,
        30,  90,  0,
        67,  60,  0,
        67,  90,  0
      ]), gl.STATIC_DRAW)
    }
  }
}
</script>

<style scoped>
.canvas {
  width: 600px;
  height: 600px;
}
</style>