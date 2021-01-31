<template>
  <div class=''>
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    computed: {

    },
    watch: {

    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        const canvas = this.$refs.canvas
        canvas.width = 800
        canvas.height = 600
        const ctx = canvas.getContext('2d')

        ctx.fillRect(100, 100, 50, 50)
        ctx.strokeRect(90, 90, 70, 70)
        ctx.clearRect(115, 115, 20, 20)
        ctx.fillRect(120, 120, 10, 10)

        ctx.beginPath()
        ctx.moveTo(200, 200)
        ctx.lineTo(230, 170)
        ctx.lineTo(230, 230)
        // ctx.lineTo(200, 200)
        ctx.closePath()
        ctx.stroke()
        // ctx.fill()
        ctx.beginPath()
        ctx.arc(300, 300, 50, 0, Math.PI / 2, false)
        ctx.lineTo(300, 300)
        ctx.lineTo(350, 300)
        
        ctx.stroke()

        ctx.moveTo(580, 150)
        ctx.quadraticCurveTo(430, 130, 450, 230)
        ctx.quadraticCurveTo(460, 300, 500, 300)
        ctx.quadraticCurveTo(500, 330, 470, 345)
        ctx.quadraticCurveTo(500, 345, 530, 300)
        ctx.quadraticCurveTo(650, 300, 630, 200)
        ctx.quadraticCurveTo(620, 160, 580, 150)
        // ctx.quadraticCurveTo(620, 200, 620, 250)
        // ctx.quadraticCurveTo(550, 270, 450, 250)
        ctx.stroke()

        ctx.moveTo(200, 450)
        ctx.quadraticCurveTo(350, 300, 500, 450)
        ctx.stroke()

        ctx.moveTo(320, 450)
        ctx.bezierCurveTo(270, 380, 220, 500, 320, 550)
        ctx.bezierCurveTo(420, 500, 370, 380, 320, 450)
        // ctx.bezierCurveTo(180, 400, 520, 400, 500, 550)

        ctx.stroke()
        // ctx.fill()



      }
    },
    components: {

    },
  }
</script>

<style scoped lang="scss">
.canvas {
  border: 1px solid #eee;
  border-radius: 3px;
}
</style>
