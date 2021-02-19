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
      this.draw(this.arc(0, 0, 100))
    },
    arc(x0, y0, radius, startAng = 0, endAng = Math.PI) {
      const TAU_SEGMENTS = 120
      const TAU = Math.PI * 2
      const ang = Math.min(TAU, endAng - startAng)
      const ret = ang === TAU ? [] : [[x0, y0]]
      const segments = Math.round(TAU_SEGMENTS * ang / TAU)
      console.log('有几个顶点', segments)
      for(let i = 0; i <= segments; i++) {
        const x = x0 + radius * Math.cos(startAng + ang * i /segments)
        const y = y0 + radius * Math.sin(startAng + ang * i / segments)
        ret.push([x, y])
      }
      console.log('顶点坐标', ret)
      return ret
    },
    draw(points) {
      const { ctx } = this
      ctx.strokeStyle = 'black'
      ctx.beginPath()
      ctx.moveTo(...points[0])
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(...points[i])
      }
      ctx.closePath()
      ctx.stroke()
    }
  },
}
</script>

<style>
.canvas {
  border: 1px solid #eee;
}
</style>