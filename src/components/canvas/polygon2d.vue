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

      const vertices = [
        [-0.7, 0.5],
        [-0.4, 0.3],
        [-0.25, 0.71],
        [-0.1, 0.56],
        [-0.1, 0.13],
        [0.4, 0.21],
        [0, -0.6],
        [-0.3, -0.3],
        [-0.6, -0.3],
        [-0.45, 0.0],
      ];
      const poitions = vertices.map(([x, y]) => [x * 256, y * 256])

      this.draw(poitions, { strokeStyle: 'transparent', fillStyle: 'red' })
      this.draw([[100, 100], [100, 200], [150, 200]], { strokeStyle: 'transparent', fillStyle: 'blue' })

      const { left, top } = canvas.getBoundingClientRect()
      canvas.addEventListener('mousemove', evt => {
        const { x, y } = evt
        const offsetX = x - left
        const offsetY = y - top

        // ctx.clearRect(-256, -256, 512, 512)
        if (ctx.isPointInPath(offsetX, offsetY)) {
          this.draw(poitions, { strokeStyle: 'transparent', fillStyle: 'green' })
        } else {
          this.draw(poitions, { strokeStyle: 'transparent', fillStyle: 'red' })
        }
      })
    },

    draw(points, {
      strokeStyle = 'black',
      fillStyle = null
    } = {}) {
      const { ctx } = this
      ctx.strokeStyle = strokeStyle
      ctx.beginPath()
      ctx.moveTo(...points[0])
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(...points[i])
      }
      ctx.closePath()
      if (fillStyle) {
        ctx.fillStyle = fillStyle
        ctx.fill()
      }
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