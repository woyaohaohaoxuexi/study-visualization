<template>
  <div>
    <canvas ref="canvas" class="canvas" width="512" height="512"></canvas>
  </div>
</template>

<script>
import GlRenderer from 'gl-renderer'
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
      const renderer = new GlRenderer(canvas)

      // 2. 创建 WebGL 程序
      // 设置顶点着色器
      // attribute 用来声明变量
      const vertex = `
        attribute vec2 a_vertexPosition;
        attribute vec2 uv;
        varying vec2 vUv;

        void main() {
          gl_PointSize = 1.0;
          vUv = uv;
          gl_Position = vec4(a_vertexPosition, 1, 1);
        }
      `

      // 设置片元着色器
      // precision mediump float 是用来设置 float 类型数据的精度
      // mediump 是中等精度
      // lowp 是低等精度
      // highp 是高等精度
      // 还有需要注意的一点是： 如果设置了 float 类型就必须有小数点（整数也要添加小数点）
      // fract 用来取一个数的小数部分。
      const fragment = `
        precision mediump float;

        varying vec2 vUv;
        uniform float rows;

        void main()
        {
          vec2 st = fract(vUv * rows);
          float d1 = step(st.x, 0.9);
          float d2 = step(0.1, st.y);
          gl_FragColor.rgb = mix(vec3(0.8), vec3(1.0), d1 * d2);
          gl_FragColor.a = 1.0;
        }
      `

      const program = renderer.compileSync(fragment, vertex)
      renderer.useProgram(program)
      renderer.uniforms.rows = 8

      const rows = [1, 4, 16, 32, 64]
      let idx = 0
      // const timerId = setInterval(() => {
      //   renderer.uniforms.rows = rows[idx++]
      //   if (idx > 4) {
      //     clearInterval(timerId)
      //   }
      // }, 1000)

      renderer.setMeshData([{
        positions: [
          [-1, -1],
          [-1, 1],
          [1, 1],
          [1, -1]
        ],
        attributes: {
          uv: [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0]
          ]
        },
        cells: [[0, 1, 2], [2, 0, 3]]
      }])

      renderer.render()
    }
  }
}
</script>

<style>aa
.canvas {
  /*border: 1px solid #ccc;*/
  background-image: linear-gradient(to right, transparent 90%, #ccc 0), linear-gradient(to bottom, transparent 90%, #ccc 0);
  background-size: 8px 8px, 8px 8px;
}
</style>