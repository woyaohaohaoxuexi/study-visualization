<template>
  <div>
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: "GlThree",
  mounted() {
    const canvas = this.$refs.canvas
    canvas.width = 800
    canvas.height = 600
    const gl = canvas.getContext('webgl')

    // 定义一个顶点着色器
    const vertex = `
      attribute vec4 a_position;

      void main() {
        gl_Position = a_position;
      }
    `

    // 定义一个片元着色器
    const fragment = `
      precision mediump float;
      uniform vec4 u_color;
      void main() {
        gl_FragColor = u_color;
      }
    `

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, vertex)
    gl.compileShader(vertexShader)
    const vertexCompileSuccess = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)
    console.log('顶点着色器是否创建成功', vertexCompileSuccess)

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, fragment)
    gl.compileShader(fragmentShader)
    const fragmentCompileSuccess = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)
    console.log('偏远着色器是否创建成功', fragmentCompileSuccess)

    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)

    gl.linkProgram(program)

    gl.useProgram(program)

    const isLinkProgram = gl.getProgramParameter(program, gl.LINK_STATUS)
    console.log('着色程序是否 link 成功', isLinkProgram)

    // 创建一个缓冲对象
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    // 找到顶点属性所在的位置
    const positionArrtibuteLocation = gl.getAttribLocation(program, 'a_position')
    const colorUnifromLocation = gl.getUniformLocation(program, 'u_color')
    // const positions = [
    //   200, 200,
    //   400, 200,
    //   300, 500
    // ]
    const positions = [
      0.3, 0.3, 0.2,
      0.5, 0.8, 0.4,
      0.7, 0.3, 0.2,
      0.15, 0.15, 0.2,
      0.35, 0.65, 0.2,
      0.55, 0.15, 0.2
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.enableVertexAttribArray(positionArrtibuteLocation)

    gl.vertexAttribPointer(positionArrtibuteLocation, 3, gl.FLOAT, false, 0, 0)
    gl.uniform4f(colorUnifromLocation, 0.8, 0.2, 0.6, 1)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    gl.uniform4f(colorUnifromLocation, 0.2, 0.8, 0.6, 1)
    gl.drawArrays(gl.TRIANGLES, 3, 3)

  }
}
</script>

<style scoped>
.canvas {
  border: 1px solid #f3f3f3;
}
</style>