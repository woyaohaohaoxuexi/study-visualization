<template>
  <div class=''>
    <canvas ref="canvas"></canvas>
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
      const points3 = this.regularShape(3, 128, 128, 100)
      const points4 = this.regularShape(5, -100, -100, 150)
      const points8 = this.regularShape(8, 125, -120, 100)
      const { width, height } = canvas
      ctx.translate(0.5 * width, 0.5 * height)
      ctx.scale(1, -1)
      this.draw(points3)
      this.draw(points4)
      this.draw(points8)
    },
    regularShape(edges = 3, x, y, step) {
      const ret = []
      const delta = Math.PI - (Math.PI * ((edges - 2) / edges))
      let v = new Vector2D(x, y)
      const first = new Vector2D(step, 0)
      ret.push(v)
      for (let i = 1; i < edges; i++) {
        v = v.copy().add(first.rotate(delta))
        ret.push(v)
      }
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

<style scoped lang="stylus">

</style>