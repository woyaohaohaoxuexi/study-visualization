<template>
  <div>
    <canvas ref="canvas" class="canvas"></canvas>
    <div id="uiContainer">
    <div id="ui">
      <div id="x"></div>
      <div id="y"></div>
      <div id="angle"></div>
      <div id="scaleX"></div>
      <div id="scaleY"></div>
    </div>
  </div>
  </div>
</template>

<script>
const webglLessonsUI = require('@/assets/webgl-lessons-ui');
const webglUtils = require('@/assets/webgl-utils');

// console.log('UI ', webglLessonsUi);

export default {
  name: "GlFour",
  data() {
    return {
      translation: [],
      rotation: [],
      scaletion: [],
      color: [Math.random(), Math.random(), Math.random(), 1],
      gl: null,
      positionLocation: null,
      resolutionLocation: null,
      translationLocation: null,
      rotatedLocation: null,
      scaledLocation: null,
      colorLocation: null
    }
  },
  mounted() {
    const canvas = this.$refs.canvas
    canvas.width = 800
    canvas.height = 600
    const gl = this.gl = canvas.getContext('webgl')

    // 设置顶点着色器
    const vertex = `
      attribute vec2 a_position;

      uniform vec2 u_resolution;
      uniform vec2 u_translation;
      uniform vec2 u_rotation;
      uniform vec2 u_scale;
      void main() {
        // 缩放矩阵
        vec2 scaledPosition = a_position * u_scale;
        // 旋转矩阵
        vec2 rotatedPosition = vec2 (
          scaledPosition.x * u_rotation.x + scaledPosition.y * u_rotation.y,
          scaledPosition.y * u_rotation.x - scaledPosition.x * u_rotation.y
        );
        // 平移矩阵
        vec2 position = rotatedPosition + u_translation;

        vec2 zeroToOne = position / u_resolution;
        vec2 zeroToTwo = zeroToOne * 2.0;
        vec2 clipSpace = zeroToTwo - 1.0;
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1.0);
      }
    `
    // 设置图元着色器
    const fragment = `
      precision mediump float;

      uniform vec4 u_color;
      void main() {
        gl_FragColor = u_color;
      }
    `
    const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vertex)
    const fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fragment)
    const program = this.createProgram(gl, vertexShader, fragmentShader)
    // 一定要在设置 uniform 变量前调用这个函数
    gl.useProgram(program)
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    const points = [
      // left column
      0, 0,
      30, 0,
      0, 150,
      0, 150,
      30, 0,
      30, 150,

      // top rung
      30, 0,
      100, 0,
      30, 30,
      30, 30,
      100, 0,
      100, 30,

      // middle rung
      30, 60,
      67, 60,
      30, 90,
      30, 90,
      67, 60,
      67, 90
    ]
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW)
    this.positionLocation = gl.getAttribLocation(program, 'a_position')
    this.resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
    this.translationLocation = gl.getUniformLocation(program, 'u_translation')
    this.rotatedLocation = gl.getUniformLocation(program, 'u_rotation')
    this.scaledLocation = gl.getUniformLocation(program, 'u_scale')
    this.colorLocation = gl.getUniformLocation(program, 'u_color')

    gl.enableVertexAttribArray(this.positionLocation)

    this.translation = [100, 150]
    this.rotation = [0, 0]
    this.scaletion = [1, 1]

    this.drawScene()

    webglLessonsUI.setupSlider("#x", {slide: this.updatePosition(0), max: gl.canvas.width });
    webglLessonsUI.setupSlider("#y", {slide: this.updatePosition(1), max: gl.canvas.height});
    webglLessonsUI.setupSlider("#angle", {slide: this.updateAngle, max: 360});
    webglLessonsUI.setupSlider("#scaleX", {value: this.scaletion[0], slide: this.updateScale(0), min: -5, max: 5, step: 0.01, precision: 2});
    webglLessonsUI.setupSlider("#scaleY", {value: this.scaletion[1], slide: this.updateScale(1), min: -5, max: 5, step: 0.01, precision: 2});
    // gl.enableVertexAttribArray(this.positionLocation)
    // gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)
    // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    // gl.vertexAttribPointer(positionVertexLocation, 2, gl.FLOAT, false, 0, 0)

    // gl.drawArrays(gl.TRIANGLES, 0, 3)
  },
  methods: {
    createShader(gl, type, source) {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)

      if (success) {
        return shader
      }

      gl.deleteShader(shader)
      throw('创建shader 失败', gl.getShaderInfoLog(shader))
    },
    createProgram(gl, vertesShader, fragmentShader) {
      const program = gl.createProgram()
      gl.attachShader(program, vertesShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)

      const success = gl.getProgramParameter(program, gl.LINK_STATUS)
      console.log('创建着色程序', success)
      if (success) {
        return program
      }

      throw('创建着色器程序失败', gl.getProgramInfoLog(program))
    },
    updatePosition(index) {
      const _this = this
      return function(event, ui) {
        _this.translation[index] = ui.value
        _this.drawScene()
      }
    },
    updateAngle(event, ui) {
      const angleInRadians = (360 - ui.value) * Math.PI / 180
      this.rotation[0] = Math.cos(angleInRadians)
      this.rotation[1] = Math.sin(angleInRadians)
      this.drawScene()
    },
    updateScale(index) {
      const _this = this
      return (event, val) => {
        this.scaletion[index] = val.value
        this.drawScene()
      }
    },
    drawScene() {
      const { gl, positionLocation, resolutionLocation, translationLocation, rotatedLocation, scaledLocation, colorLocation } = this
      webglUtils.resizeCanvasToDisplaySize(gl.canvas);

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

      gl.clear(gl.COLOR_BUFFER_BIT)

      const size = 2
      const type = gl.FLOAT
      const offset = 0
      const normalize = false
      const stride = 0
      gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset)

      gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height)      
      
      gl.uniform4fv(colorLocation, this.color)
      
      gl.uniform2fv(translationLocation, this.translation)
      gl.uniform2fv(rotatedLocation, this.rotation)
      gl.uniform2fv(scaledLocation, this.scaletion)
      console.log('缩放矩阵', this.scaletion);
      
      const primitiveType = gl.TRIANGLES
      const cont = 18

      gl.drawArrays(primitiveType, offset, cont)

    }
  }
}
</script>

<style scoped>
.canvas {
  border: 1px solid #f2f2f2;
}
</style>>