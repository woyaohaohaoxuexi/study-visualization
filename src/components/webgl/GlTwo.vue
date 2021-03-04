<template>
  <div>
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script>
import { randomInt, setRectangle } from './util'
export default {
  name: "GlTwo",
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
        // 从像素坐标转换的 0.0 到 1.0
        vec2 zeroToOne = a_position / u_resolution;

        // 再把 0 -> 1 转换 0 -> 2
        vec2 zeroToTwo = zeroToOne * 2.0;

        // 把 0 -> 2 转换到 -1 > +1 （裁剪空间）
        vec2 clipSpace = zeroToTwo - 1.0;
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
      }
    `
    // 设置片元着色器
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
    const vertexSuccess = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)
    console.log('顶点着色器是否编译成功', vertexSuccess)

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, fragment)
    gl.compileShader(fragmentShader)
    const fragmentSuccess = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)
    console.log('片元着色器是否编译成功', fragmentSuccess)

    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)


    // 找到顶点属性在着色程序中的位置
    const attributeLocation = gl.getAttribLocation(program, 'a_position')
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution')
    const colorUniformLocation = gl.getUniformLocation(program, 'u_color')

    // 设置顶点数据
    const points = [
      100, 100,
      400, 100,
      100, 400,
      100, 400,
      400, 100,
      400, 400
    ]
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW)




    // 开始渲染
    gl.useProgram(program)

    gl.vertexAttribPointer(attributeLocation, 2, gl.FLOAT, false, 0, 0)

    gl.enableVertexAttribArray(attributeLocation)

    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)
    
    for (let i = 0; i < 50; i++) {
      setRectangle(gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300))

      gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }
    // gl.drawArrays(gl.TRIANGLES, 0, 6)
  }
}
</script>

<style scoped>
.canvas {
  border: 1px solid #f3f3f3;
}
</style>