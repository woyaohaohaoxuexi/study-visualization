<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import { default as draw, Vector2D } from './common1'

export default {
  name: "meishu.vue",
  data() {
    return {

    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const canvas = this.$refs.canvas
      canvas.width = 600
      canvas.height = 400
      const ctx = canvas.getContext('2d')
      ctx.translate(0, canvas.height)
      ctx.scale(1, -1)
      // 指定如何绘制线段末端的属性
      ctx.lineCap = 'round'

      const v0 = new Vector2D(256, 0)
      draw.drawBranch(ctx, v0, 50, 10, Math.PI / 2, 3)

    }
  }
}
</script>

<style scoped>

</style>