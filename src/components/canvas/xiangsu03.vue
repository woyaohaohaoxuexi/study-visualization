<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { loadImage, getImageData } from "@/components/canvas/utils";

export default {
  name: "xiangsu03",
  mounted() {
    const canvas = this.$refs.canvas
    const ctx = canvas.getContext('2d')
    this.handleImage(canvas, ctx)
  },
  methods: {
    async handleImage(canvas, ctx) {
      const img = await loadImage('https://p2.ssl.qhimg.com/d/inn/4b7e384c55dc/girl1.jpg')
      // const img = await loadImage('assets/xiangsu.jpg')
      const {width, height} = img
      console.log(width, height)
      canvas.width = width / 2
      canvas.height = height / 2
      ctx.drawImage(img, 0, 0, width, height, 0, 0, width / 2, height / 2)
      const cacheData = {
        x: '',
        y: '',
        scale: 2,
        radius: 150
      }
      let imageData = null
      canvas.addEventListener('mousemove', function(event) {
        const { layerX, layerY } = event
        const { x, y, scale, radius } = cacheData
        if (imageData) {
          ctx.putImageData(imageData, x - radius, y - radius)
        }
        cacheData.x = layerX
        cacheData.y = layerY
        imageData = ctx.getImageData(
          cacheData.x - radius,
          cacheData.y - radius,
          radius * 2,
          radius * 2
        )

        ctx.save()

        ctx.beginPath()
        ctx.arc(layerX, layerY, radius, 0, Math.PI * 2, false)
        ctx.closePath()
        ctx.clip()

        ctx.drawImage(canvas,
          cacheData.x - radius, cacheData.y - radius,
          radius * 2, radius * 2,
          cacheData.x - radius * 2, cacheData.y - radius * 2,
          radius * 2 * 2, radius * 2 * 2
        )

        ctx.restore()

      })
    }
  }
}
</script>

<style scoped>

</style>