<template>
  <div>
    <canvas id="canvas" ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script>
// 像素化处理图片，采用颜色矩阵（也就是滤镜）
import { loadImage, getImageData, traverse } from './utils'
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
      // (async function() {
      //   const img = await loadImage('https://p2.ssl.qhimg.com/d/inn/4b7e384c55dc/girl1.jpg')
      //   const imageData = getImageData(img)
      //   traverse(imageData, ({r, g, b, a}) => {
      //     return transformColor(
      //       [r, g, b, a],
      //       channel({ r: 1.2 }),
      //       brightness(1.2),
      //       saturate(1.2)
      //     )
      //   })
      //
      //   canvas.width = imageData.width
      //   canvas.height = imageData.height
      //   ctx.putImageData(imageData, 0, 0)
      // }())
    },
    async handleImage() {
      const ctx = this.ctx
      const img = await loadImage('https://p2.ssl.qhimg.com/d/inn/4b7e384c55dc/girl1.jpg')
      const imageData = getImageData(img)
      traverse(imageData, ({r, g, b, a}) => {
        return transformColor(
          [r, g, b, a],
          channel({ r: 1.2 }),
          brightness(1.2),
          saturate(1.2)
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