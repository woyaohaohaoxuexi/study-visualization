<template>
  <div>
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script>
// 像素化处理图片
import { loadImage, getImageData, traverse } from './utils'
export default {
  name: "xiangsu",
  data() {
    return {}
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      (async function() {
        const img = await loadImage('https://p2.ssl.qhimg.com/d/inn/4b7e384c55dc/girl1.jpg')
        const imageData = getImageData(img)
        traverse(imageData, ({r, g, b, a}) => {
          const v = 0.2126 * r + 0.7152 * g + 0.0722 * b
          return [v, v, v, a]
        })

        canvas.width = imageData.width
        canvas.height = imageData.height
        ctx.putImageData(imageData, 0, 0)
      }())
    }
  }
}
</script>

<style scoped>

</style>