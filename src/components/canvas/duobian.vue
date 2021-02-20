<template>
  <div class=''>
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script>
import { Vector2D } from './common1'
export default {
  name: '',
  data() {
    return {
      ctx: null,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const canvas = this.$refs.canvas
      canvas.width = 800
      canvas.height = 600
      const ctx = this.ctx = canvas.getContext('2d')
      const { width, height } = canvas
      ctx.translate(0.5 * width, 0.5 * height)
      ctx.scale(1, -1)

      // 绘制多边形
      // 1. 添加顶点
      const points = [new Vector2D(0, 100)]
      // 以原点为正五边形的中心点，然后依次旋转 72° 就可以得到每一个顶点
      for (let i = 1; i <= 4; i++) {
        const p = points[0].copy().rotate(i * Math.PI * 0.4)
        console.log('i ==> p', i, p)
        points.push(p)
      }
      const first = points[0]
      console.log('起点', first)
      ctx.beginPath()

      ctx.arc(first[0], first[1], 10, 0, Math.PI * 2)
      ctx.fillStyle = 'red'
      ctx.fill()
      ctx.closePath()
      // 2. 开始绘制
      // 绘制正五边形
      const polygon = [...points]
      ctx.save()
      ctx.translate(-128, 0)
      console.log('五边形顶点', polygon)
      this.draw(polygon)
      ctx.restore()

      // 绘制五角星
      const stars = [
          points[0],
          points[2],
          points[4],
          points[1],
          points[3]
      ]
      ctx.save()
      ctx.translate(128, 0)
      this.draw(stars, { rule: 'evenodd' })
      ctx.restore()
    },
    // 不规则图形

    draw(points, {
      fillStyle = 'black',
      close = false,
      rule = 'nonzero'
    } = {}) {
      const { ctx } = this
      ctx.beginPath()
      ctx.moveTo(...points[0])
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(...points[i])
      }
      if (close) {
        ctx.closePath()
      }
      ctx.fillStyle = fillStyle
      ctx.fill(rule)
    }
  },
}
</script>

<style>
.canvas {
  border: 1px solid #eee;
}
</style>