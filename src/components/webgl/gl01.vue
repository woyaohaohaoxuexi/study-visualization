<template>
  <div>
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: "LearnWebGL",
  data() {
    return {
      gl: null
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 1. 获取 webgl 实例
      const canvas = this.$refs.canvas
      canvas.width = 800
      canvas.height = 600
      const gl = canvas.getContext('webgl')

      // 2. 创建 WebGL 程序
      // 设置顶点着色器
      // attribute 用来声明变量
      const vertex = `
        attribute vec2 position;

        void main() {
          gl_PointSize = 1.0;
          gl_Position = vec4(position * 0.5, 1.0, 1.0);
        }
      `

      // 设置片元着色器
      // precision mediump float 是用来设置 float 类型数据的精度
      // mediump 是中等精度
      // lowp 是低等精度
      // highp 是高等精度
      // 还有需要注意的一点是： 如果设置了 float 类型就必须有小数点（整数也要添加小数点）
      const fragment = `
        precision mediump float;

        void main()
        {
          gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);
        }
      `

      // 把顶点着色器和片元着色器创建成 shader 对象
      const vertexShader = gl.createShader(gl.VERTEX_SHADER)
      gl.shaderSource(vertexShader, vertex)
      gl.compileShader(vertexShader)

      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
      gl.shaderSource(fragmentShader, fragment)
      gl.compileShader(fragmentShader)

      // 创建 WebglProgram 对象，添加两个着色器生成的 shader 对象
      const program = gl.createProgram()
      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)

      gl.useProgram(program)

      // 3. 将数据存入缓冲区
      const points = new Float32Array([
        -1, -1,
        0, 1,
        1, -1
      ])
      const bufferId = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, bufferId)
      gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW)

      // 4. 将缓冲区数据读取到 GPU
      // 获取顶点着色器中的 position 变量的地址
      const vPosition = gl.getAttribLocation(program, 'position')
      // 给变量设置长度和类型
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0)
      // 激活这个变量
      gl.enableVertexAttribArray(vPosition)

      // 5. 执行着色器程序完成绘制
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, points.length / 2)
    }
  }
}
</script>

<style>
.canvas {
  border: 1px solid #ccc;
}
</style>