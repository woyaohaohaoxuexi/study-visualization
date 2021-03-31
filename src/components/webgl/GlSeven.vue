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
      positionBuffer: null,
      colorBuffer: null,
      color: [Math.random(), Math.random(), Math.random(), 1]
    }
  },
  computed: {
    vertex() {
      return `
        attribute vec4 a_position;
        attribute vec4 a_color;
        uniform mat4 u_matrix;
        varying vec4 v_color;

        void main() {
          gl_Position = u_matrix * a_position;
          v_color = a_color;
        }
      `
    },
    fragment() {
      return `
        precision mediump float;
        varying vec4 v_color;

        void main() {
          gl_FragColor = v_color;
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
      // this.colorLocation = gl.getUniformLocation(program, 'u_color')
      this.matrixLocation = gl.getUniformLocation(program, 'u_matrix')
      this.colorLocation = gl.getAttribLocation(program, 'a_color')
      this.positionBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer)
      this.setGeometry(gl)

      this.colorBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer)
      this.setColor(gl)

      this.transition = [45, 150, 0]
      this.rotation = [degToRad(40), degToRad(25), degToRad(325)]
      this.scale = [1, 1, 1]

      this.drawScene()

      this.addLessonsUI()
    },
    // 设置顶点数据
    setGeometry(gl) {
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        // left column front
        0,   0,  0,
        0, 150,  0,
        30,   0,  0,
        0, 150,  0,
        30, 150,  0,
        30,   0,  0,

        // top rung front
        30,   0,  0,
        30,  30,  0,
        100,   0,  0,
        30,  30,  0,
        100,  30,  0,
        100,   0,  0,

        // middle rung front
        30,  60,  0,
        30,  90,  0,
        67,  60,  0,
        30,  90,  0,
        67,  90,  0,
        67,  60,  0,

        // left column back
        0,   0,  30,
        30,   0,  30,
        0, 150,  30,
        0, 150,  30,
        30,   0,  30,
        30, 150,  30,

        // top rung back
        30,   0,  30,
        100,   0,  30,
        30,  30,  30,
        30,  30,  30,
        100,   0,  30,
        100,  30,  30,

        // middle rung back
        30,  60,  30,
        67,  60,  30,
        30,  90,  30,
        30,  90,  30,
        67,  60,  30,
        67,  90,  30,

        // top
        0,   0,   0,
        100,   0,   0,
        100,   0,  30,
        0,   0,   0,
        100,   0,  30,
        0,   0,  30,

        // top rung right
        100,   0,   0,
        100,  30,   0,
        100,  30,  30,
        100,   0,   0,
        100,  30,  30,
        100,   0,  30,

        // under top rung
        30,   30,   0,
        30,   30,  30,
        100,  30,  30,
        30,   30,   0,
        100,  30,  30,
        100,  30,   0,

        // between top rung and middle
        30,   30,   0,
        30,   60,  30,
        30,   30,  30,
        30,   30,   0,
        30,   60,   0,
        30,   60,  30,

        // top of middle rung
        30,   60,   0,
        67,   60,  30,
        30,   60,  30,
        30,   60,   0,
        67,   60,   0,
        67,   60,  30,

        // right of middle rung
        67,   60,   0,
        67,   90,  30,
        67,   60,  30,
        67,   60,   0,
        67,   90,   0,
        67,   90,  30,

        // bottom of middle rung.
        30,   90,   0,
        30,   90,  30,
        67,   90,  30,
        30,   90,   0,
        67,   90,  30,
        67,   90,   0,

        // right of bottom
        30,   90,   0,
        30,  150,  30,
        30,   90,  30,
        30,   90,   0,
        30,  150,   0,
        30,  150,  30,

        // bottom
        0,   150,   0,
        0,   150,  30,
        30,  150,  30,
        0,   150,   0,
        30,  150,  30,
        30,  150,   0,

        // left side
        0,   0,   0,
        0,   0,  30,
        0, 150,  30,
        0,   0,   0,
        0, 150,  30,
        0, 150,   0
      ]), gl.STATIC_DRAW)
    },
    // 设置颜色值
    setColor(gl) {
      console.log('设置颜色')
      gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array([
        // left column front
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,

        // top rung front
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,

        // middle rung front
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,

        // left column back
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,

        // top rung back
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,

        // middle rung back
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,

        // top
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,

        // top rung right
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,

        // under top rung
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,

        // between top rung and middle
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,

        // top of middle rung
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,

        // right of middle rung
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,

        // bottom of middle rung.
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,

        // right of bottom
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,

        // bottom
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,

        // left side
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
        160, 160, 220
      ]), gl.STATIC_DRAW)
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

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

      // 启用顶点变量
      gl.enableVertexAttribArray(positionLocation)
      gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer)
      gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0)
      // 启用 color 变量
      gl.enableVertexAttribArray(colorLocation)
      gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer)
      gl.vertexAttribPointer(colorLocation, 3, gl.UNSIGNED_BYTE, true, 0, 0)

      // gl.uniform4fv(colorLocation, color)
      console.log('colorLocation', gl)
      let matrix = m4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 400)
      matrix = m4.translate(matrix, transition[0], transition[1], transition[2])
      matrix = m4.xRotate(matrix, rotation[0])
      matrix = m4.yRotate(matrix, rotation[1])
      matrix = m4.zRotate(matrix, rotation[2])
      matrix = m4.scale(matrix, scale[0], scale[1], scale[2])
      gl.uniformMatrix4fv(matrixLocation, false, matrix)

      // 不用绘制背面
      gl.enable(gl.CULL_FACE)
      // 深度测试
      gl.enable(gl.DEPTH_TEST)
      gl.drawArrays(gl.TRIANGLES, 0, 16 * 6)

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