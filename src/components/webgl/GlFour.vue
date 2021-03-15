<template>
  <div>
    <canvas ref="canvas" class="canvas"></canvas>
    <div id="uiContainer">
    <div id="ui">
      <div id="x"></div>
      <div id="y"></div>
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
      translation: [0, 0],
      gl: null,
      positionLocation: null,
      resolutionLocation: null,
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
      void main() {
        vec2 zeroToOne = a_position / u_resolution;
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

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    // const points = [
    //   -0.5, -0.5,
    //   0.5, -0.5,
    //   0, 0.5
    // ]
    const points = [
      200, 150,
      600, 150,
      400, 450
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW)
    // 一定要在设置 uniform 变量前调用这个函数
    gl.useProgram(program)
    this.positionLocation = gl.getAttribLocation(program, 'a_position')
    this.resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
    this.colorLocation = gl.getUniformLocation(program, 'u_color')

    gl.enableVertexAttribArray(this.positionLocation)

    this.drawScene()

    webglLessonsUI.setupSlider("#x", {slide: this.updatePosition(0), max: gl.canvas.width });
    webglLessonsUI.setupSlider("#y", {slide: this.updatePosition(1), max: gl.canvas.height});
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
    drawScene() {
      const gl = this.gl
      const width = 100
      const height = 30
      const color = [Math.random(), Math.random(), Math.random(), 1];
      const [x, y] = this.translation
      const { positionLocation, resolutionLocation, colorLocation } = this
      webglUtils.resizeCanvasToDisplaySize(gl.canvas);

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

      gl.clear(gl.COLOR_BUFFER_BIT)

      this.setRectangle(x, y, width, height)

      const size = 2
      const type = gl.FLOAT
      const offset = 0
      const normalize = false
      const stride = 0
      gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset)

      gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height)
      console.log('COLOR', color);
      
      gl.uniform4fv(colorLocation, color)

      const primitiveType = gl.TRIANGLES
      const cont = 6

      gl.drawArrays(primitiveType, offset, cont)

    },
    setRectangle(x, y, width, height) {
      const gl = this.gl
      const x1 = x
      const x2 = x + width
      const y1 = y
      const y2 = y + height
      

      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y2,
        x2, y1
      ]), gl.STATIC_DRAW)
    }
  }
}
</script>

<style scoped>
.canvas {
  border: 1px solid #f2f2f2;
}
</style>