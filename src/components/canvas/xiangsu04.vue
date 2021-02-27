<template>
  <div>
    <canvas id="canvas" ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script>
// 像素化处理图片，采用颜色矩阵（也就是滤镜）
import { loadImage, getImageData, traverse, getPixel } from './utils'
import { transformColor, brightness, saturate } from "@/components/canvas/color-matrix";

function channel({r = 1, g = 1, b = 1}) {
  return [
    r, 0, 0, 0, 0,
    0, g, 0, 0, 0,
    0, 0, b, 0, 0,
    0, 0, 0, 1, 0,
  ];
}

export default {
  name: "xiangsu",
  data() {
    return {
      ctx: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
    // this.init()
  },
  methods: {
    init() {
      const canvas = this.$refs.canvas
      this.ctx = canvas.getContext('2d')
      this.handleImage()
    },
    async handleImage() {
      const ctx = this.ctx
      // const img = await loadImage('https://p2.ssl.qhimg.com/d/inn/4b7e384c55dc/girl1.jpg')
      const img = await loadImage('/src/girl1.jpg')
      // const img = await loadImage('/src/xiangsu.jpg')
      const sunlight = await loadImage('/src/sunlight.png')
      const imageData = getImageData(img)
      const texture = getImageData(sunlight)
      traverse(imageData, ({r, g, b, a, index}) => {
        const texColor = getPixel(texture, index)
        return transformColor([r, g, b, a],
          brightness(1 + 0.7 * texColor[3]),
          saturate(2 - texColor[3])
        )
      })

      canvas.width = imageData.width
      canvas.height = imageData.height
      ctx.putImageData(imageData, 0, 0)
    }
  }
}
</script>

<style scoped>

</style>