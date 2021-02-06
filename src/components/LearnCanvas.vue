<template>
  <div class=''>
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script>
  const d3 = require('d3-hierarchy')
  const draw = (ctx, node, {fillStyle = 'rgba(0, 0, 0, 0.2)', textColor = 'white'} = {}) => {
    const children  = node.children
    const { x, y, r } = node
    ctx.fillStyle = fillStyle
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
    if (children) {
      for (let i = 0; i < children.length; i++) {
        draw(ctx, children[i])
      }
    } else {
      const name = node.data.name
      ctx.fillStyle = textColor
      ctx.font = '1.5rem Arial'
      ctx.textAlign = 'center'
      ctx.fillText(name, x, y)
   }
  }
  export default {
    data() {
      return {
        ctx: ''
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
        canvas.height = 800
        this.ctx = canvas.getContext('2d')
        this.drawStar();
        // this.rect()
        // this.face()
        // this.path2d()
        // this.translateRect(canvas)
        // this.testHierarchy()
      },
      rect() {
        const ctx = this.ctx
        ctx.fillRect(100, 100, 50, 50)
        ctx.strokeRect(90, 90, 70, 70)
        ctx.clearRect(115, 115, 20, 20)
        ctx.fillRect(120, 120, 10, 10)
      },
      line() {
        const ctx = this.ctx
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
      },
      bezier() {
        const ctx = this.ctx
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
      },
      // 笑脸
      face() {
        const ctx = this.ctx
        ctx.beginPath()
        // ctx.moveTo(300, 300)
        ctx.arc(350, 300, 80, 0, Math.PI * 2, true)
        // 移动到第二段圆弧的起点
        ctx.moveTo(400, 300)
        ctx.arc(350, 300, 50, 0, Math.PI, false)
        ctx.moveTo(330, 280)
        ctx.arc(325, 280, 5, 0, Math.PI * 2, true)
        ctx.moveTo(375, 280)
        ctx.arc(370, 280, 5, 0, Math.PI * 2, true)
        ctx.stroke()
      },
      path2d() {
        const ctx = this.ctx
        const rectangle = new Path2D()
        rectangle.moveTo(100, 50)
        rectangle.rect(100, 100, 50, 50)

        const circle = new Path2D()
        circle.moveTo(300, 300)
        circle.arc(300, 300, 100, 0, Math.PI * 2)

        const line = new Path2D("M10 10 h 80 v 80 h -80 Z")
        ctx.stroke(rectangle)
        ctx.fill(circle)
        ctx.stroke(line)
      },
      translateRect(canvas) {
        const ctx = this.ctx
        ctx.translate(-50, -50)
        ctx.rect(0.5 * canvas.width, 0.5 * canvas.height, 100, 100)
        ctx.translate(50, 50)
        ctx.stroke()
      },
      async testHierarchy() {
        const ctx = this.ctx
        const dataUrl = 'https://s5.ssl.qhres.com/static/b0695e2dd30daa64.json'
        const data = await (await fetch(dataUrl)).json()
        console.log('json 数据', data)
        const regions = d3.hierarchy(data)
          .sum(d => 1)
          .sort((a, b) => b.value - a.value)

        const pack = d3.pack()
          .size([1600, 1600])
          .padding(3)

        const root = pack(regions)
        console.log('处理后的数据', root)
        draw(ctx, root)
      },
      drawStar() {
        const ctx = this.ctx;
        const r = 100;
        const arr = [];
        
        // for (let i = 0; i <= 360; i += 72) {
        //   let x = Math.cos(Math.PI / 180 * i) * r + 300;
        //   let y = Math.sin(Math.PI / 180 * i) * r + 300;
        //   arr.push([x, y]);
        // }
        // ctx.beginPath();
        // const [one, two, three, four, five] = arr;
        // ctx.moveTo(one[0], one[1]);
        // ctx.lineTo(three[0], three[1]);
        // ctx.lineTo(five[0], five[1]);
        // ctx.lineTo(two[0], two[1]);
        // ctx.lineTo(four[0], four[1]);
        // ctx.lineTo(one[0], one[1]);
        // ctx.stroke();
        // ctx.fill();
      }
    }
  }
</script>

<style scoped lang="scss">
.canvas {
  border: 1px solid #eee;
  border-radius: 3px;
}
</style>
