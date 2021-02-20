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
      canvas.width = 1400
      canvas.height = 600
      const ctx = this.ctx = canvas.getContext('2d')
      const { width, height } = canvas
      ctx.translate(0.5 * width, 0.5 * height)
      ctx.scale(1, -1)
      this.draw(this.arc(-100, 150, 100))
      // const coneRets = this.cone(100, 100, 150, 80)
      // this.draw(coneRets)
      const parabolaRets = this.parabola(0, 0, 5.5, -10, 10)
      console.log('抛物线', parabolaRets)
      this.draw(parabolaRets)
    },
    // 画园
    arc(x0, y0, radius, startAng = Math.PI / 4, endAng = Math.PI) {
      const TAU_SEGMENTS = 120
      const TAU = Math.PI * 2
      const ang = Math.min(TAU, endAng - startAng)
      const ret = ang === TAU ? [] : [[x0, y0]]
      const segments = Math.round(TAU_SEGMENTS * ang / TAU)
      console.log('有几个顶点', segments)
      for(let i = 0; i <= segments; i++) {
        const x = x0 + radius * Math.cos(startAng + ang * i / segments)
        const y = y0 + radius * Math.sin(startAng + ang * i / segments)
        ret.push([x, y])
      }
      console.log('顶点坐标', ret)
      return ret
    },
    // 画圆锥
    cone(x0, y0, langShaft, shortShaft) {
      const TAU_SEGMENTS = 120
      const TAU = Math.PI * 2
      let ret = []
      for (let i = 0; i < TAU_SEGMENTS; i++) {
        const x = langShaft * Math.cos(TAU * i / TAU_SEGMENTS)
        const y = shortShaft * Math.sin(TAU * i / TAU_SEGMENTS)
        ret.push([x, y])
      }

      return ret
    },

    // 画抛物线
    parabola(x0, y0, p, min, max) {
      const LINE_SEGMENTS = 60
      const ret = []
      for (let i = 0; i < LINE_SEGMENTS; i++) {
        const s = i / 60
        const t = min * (1 - s) + max * s
        const x = x0 + 2 * p * t ** 2
        const y = y0 + 2 * p * t
        ret.push([x, y])
      }
      return ret;
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