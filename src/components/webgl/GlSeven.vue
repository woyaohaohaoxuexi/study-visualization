<template>
  <div>
    <canvas ref="canvas" class="canvas"></canvas>
    <div class="uiContainer">
      <div id="ui">
        <div id="x"></div>
        <div id="y"></div>
        <div id="z"></div>
        <div id="angleX"></div>
        <div id="angleY"></div>
        <div id="angleZ"></div>
        <div id="scaleX"></div>
        <div id="scaleY"></div>
        <div id="scaleZ"></div>
      </div>
    </div>
  </div>
</template>

<script>
const webglLessonsUI = require('@/assets/webgl-lessons-ui');
const webglUtils = require('@/assets/webgl-utils');
import { createShader, createProgram, m4 } from './glUtils'
const radToDeg = r => r * 180 / Math.PI
const degToRad = d => d * Math.PI / 180
export default {
  name: "GlSeven",
  data() {
    return {
      gl: null,
      positionLocation: null,
      colorLocation: null,
      matrixLocation: null,
      transition: [],
      rotation: [],
      scale: [],
      color: [Math.random(), Math.random(), Math.random(), 1]
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
        uniform vec4 u_color;
        void main() {
          gl_FragColor = u_color;
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

      this.positionLocation = gl.getAttribLocation(program, 'a_position')
      this.colorLocation = gl.getUniformLocation(program, 'u_color')
      this.matrixLocation = gl.getUniformLocation(program, 'u_matrix')

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

      this.transition = [45, 150, 0]
      this.rotation = [degToRad(40), degToRad(25), degToRad(325)]
      this.scale = [1, 1, 1]

      this.drawScene()

      this.addLessonsUI()
    },
    drawScene() {
      const {
        transition, rotation, scale, color,
        positionLocation,
        colorLocation,
        matrixLocation,
        gl
      } = this
      //
      webglUtils.resizeCanvasToDisplaySize(gl.canvas)
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.enableVertexAttribArray(positionLocation)

      gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0)

      gl.uniform4fv(colorLocation, color)

      let matrix = m4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 400)
      matrix = m4.translate(matrix, transition[0], transition[1], transition[2])
      matrix = m4.xRotate(matrix, rotation[0])
      matrix = m4.yRotate(matrix, rotation[1])
      matrix = m4.zRotate(matrix, rotation[2])
      matrix = m4.scale(matrix, scale[0], scale[1], scale[2])
      console.log('设置矩阵', matrix)
      gl.uniformMatrix4fv(matrixLocation, false, matrix)
      console.log('绘制图形')
      gl.drawArrays(gl.TRIANGLES, 0, 18)

    },
    addLessonsUI() {
      const { transition, rotation, scale, gl } = this
      webglLessonsUI.setupSlider("#x", {value: transition[0], slide: this.updatePosition(0), max: gl.canvas.width });
      webglLessonsUI.setupSlider("#y", {value: transition[1], slide: this.updatePosition(1), max: gl.canvas.height});
      webglLessonsUI.setupSlider("#z", {value: transition[2], slide: this.updatePosition(2), max: gl.canvas.height});
      webglLessonsUI.setupSlider("#angleX", {value: radToDeg(rotation[0]), slide: this.updateRotation(0), max: 360});
      webglLessonsUI.setupSlider("#angleY", {value: radToDeg(rotation[1]), slide: this.updateRotation(1), max: 360});
      webglLessonsUI.setupSlider("#angleZ", {value: radToDeg(rotation[2]), slide: this.updateRotation(2), max: 360});
      webglLessonsUI.setupSlider("#scaleX", {value: scale[0], slide: this.updateScale(0), min: -5, max: 5, step: 0.01, precision: 2});
      webglLessonsUI.setupSlider("#scaleY", {value: scale[1], slide: this.updateScale(1), min: -5, max: 5, step: 0.01, precision: 2});
      webglLessonsUI.setupSlider("#scaleZ", {value: scale[2], slide: this.updateScale(2), min: -5, max: 5, step: 0.01, precision: 2});
    },
    updatePosition(index) {
      return (event, ui) => {
        this.transition[index] = ui.value
        this.drawScene()
      }
    },
    updateRotation(index) {
      return (event, ui) => {
        const angleRadians = ui.value * Math.PI / 180
        this.rotation[index] = angleRadians
        this.drawScene()
      }
    },
    updateScale(index) {
      return (event, ui) => {
        this.scale[index] = ui.value
        this.drawScene()
      }
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