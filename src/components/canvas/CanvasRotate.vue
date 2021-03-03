<template>
  <div>
    <div class="content">
      <p>文本</p>
      <canvas ref="canvas" class="canvas"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: "CanvasRotate",
  mounted() {
    const canvas = this.$refs.canvas
    canvas.width = 600
    canvas.height = 400
    const ctx = canvas.getContext('2d')
    ctx.translate(canvas.width / 2, canvas.height / 2)
    // ctx.rotate(Math.PI / 2)
    ctx.beginPath()
    ctx.moveTo(100, 100)
    ctx.lineTo(200, 100)
    ctx.stroke()
    ctx.closePath()

  }
}
</script>

<style scoped>
.content {
  width: 800px;
  height: 800px;
  transform: rotate(90deg);
  border: 1px solid blue;
}
.canvas {
  border: 1px solid red;
}
</style>