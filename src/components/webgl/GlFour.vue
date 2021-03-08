<template>
  <div>
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: "GlFour",
  mounted() {
    const canvas = this.$refs.canvas
    canvas.width = 800
    canvas.height = 600
    const gl = canvas.getContext('webgl')

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

      void main() {
        gl_FragColor = vec4(0.8, 0.1, 0.7, 1);
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
    const positionVertexLocation = gl.getAttribLocation(program, 'a_position')
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution')
    gl.enableVertexAttribArray(positionVertexLocation)
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    gl.vertexAttribPointer(positionVertexLocation, 2, gl.FLOAT, false, 0, 0)

    gl.drawArrays(gl.TRIANGLES, 0, 3)
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
    }
  }
}
</script>

<style scoped>
.canvas {
  border: 1px solid #f2f2f2;
}
</style>