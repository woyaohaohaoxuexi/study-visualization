<template>
  <div>
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: "GobangGame",
  data() {
    return {
      ctx: {},
      redArr: [],
      blueArr: [],
      splitDistance: 40,
      cont: 0
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const canvas = this.$refs.canvas;
      canvas.width = 800;
      canvas.height = 800;
      const ctx = canvas.getContext('2d');
      this.ctx = ctx;

      canvas.onclick = this.handlerClick;
      this.drawBorder(canvas);
    },
    drawBorder(canvas) {
      const ctx = this.ctx;
      const splitDistance = this.splitDistance;
      let start = 0;
      ctx.beginPath();
      while ( start <= canvas.width) {
        // 绘制水平线
        ctx.moveTo(0, start);
        ctx.lineTo(canvas.width, start);
        ctx.stroke();
        // 绘制竖线
        ctx.moveTo(start, 0);
        ctx.lineTo(start, canvas.height);
        ctx.stroke();
        start += splitDistance;
      }
    },
    handlerClick(e) {
      const splitDistance = this.splitDistance;
      const { layerX, layerY } = e;
      this.drawGobang(layerX, layerY);
    },
    drawGobang(x, y) {
      const ctx = this.ctx;
      const r = 15;
      const isRed = this.cont % 2 === 0;
      const { redArr, blueArr } = this;
      const splitDistance = this.splitDistance;
      const xCont = Math.floor(x / splitDistance);
      const yCont = Math.floor(y / splitDistance);
      const curColor = isRed ? '#ff0000' : 'skyblue';
      const pointNumber = yCont * 20 + xCont + 1;
      let isWin;
      if (redArr.some(item => item === pointNumber) || blueArr.some(item => item === pointNumber)) {
        window.alert('已有棋子，请重新选择')
        return;
      }
      if (isRed) {
        redArr.push(pointNumber);
      } else {
        blueArr.push(pointNumber);
      }
      ctx.beginPath();
      ctx.moveTo((xCont + 1) * splitDistance - (splitDistance / 2 - r), yCont * splitDistance + splitDistance / 2 );
      ctx.arc(xCont * splitDistance + splitDistance / 2, yCont * splitDistance + splitDistance / 2, r, Math.PI * 2, false);
      ctx.fillStyle = curColor;
      ctx.fill();
      if (isRed) {
        isWin = this.isWin(pointNumber, redArr);
      } else {
        isWin = this.isWin(pointNumber, blueArr);
      }
      if (isWin) {
        window.alert('恭喜' + (isRed ? '红方' : '蓝方') + '获胜');
        return;
      }
      this.cont++;
    },
    isWin(pointNumber, arr) {
      // 先判断水平方向是否满足
      return this.judgmentHorizontal(pointNumber, arr) || this.judgmentVertical(pointNumber, arr) || this.judgmentLeftSlash(pointNumber, arr) || this.judgmentRightSlash(pointNumber, arr);
    },
    // 水平方向是否满足
    judgmentHorizontal(pointNumber, arr) {
      const y = Math.floor(pointNumber / 20);
      const leftBoundary = pointNumber > 20 ? y * 20 + 1 : 1;
      const rightBoundary = pointNumber > 20 ? y * 20 + 20 : 20;
      const drawPoint = [];
      const sortArr = arr.slice().sort((a, b) => a - b);
      let isWin = false;
      sortArr.some(num => {
        if (num > rightBoundary) {
          return true;
        }
        if (num >= leftBoundary && num >= pointNumber - 4 && num <= pointNumber + 4) {
          drawPoint.push(num);
        }
        return false;
      });
      if (drawPoint.length >= 5) {
        let firstCont = drawPoint[0];
        let continuous = 0;
        isWin = drawPoint.some((item, index) => {
          if (item === firstCont + index) {
            continuous++;
          } else {
            firstCont = item;
            continuous = 1;
          }
          return continuous >= 5;
        })
      }
      return isWin;
    },
    // 纵向是否满足
    judgmentVertical(pointNumber, arr) {
      const y = Math.floor(pointNumber / 20);
      const yu = pointNumber > 20 ? pointNumber % 20 : pointNumber;
      const sortArr = arr.slice().sort((a, b) => a - b);
      const tempArr = [];
      const drawPoints = [];
      let isWin = false;
      for (let i = 0; i < 20; i++) {
        if (i >= y - 4 || i <= y + 4) {
          tempArr.push(i * 20 + yu);
        }
        if (i > y + 4) {
          break;
        }
      }
      const lastNum = tempArr[tempArr.length - 1];
      sortArr.some(num => {
        if (tempArr.includes(num)) {
          drawPoints.push(num);
        }
        return num > lastNum;
      });
      if (drawPoints.length >= 5) {
        let continuous = 0;
        let firstNum = drawPoints[0];
        isWin = drawPoints.some((num, index) => {
          if (num === (firstNum + index * 20)) {
            continuous++;
          } else {
            firstNum = num;
            continuous = 1;
          }
          return continuous >= 5;
        })
      }
      return isWin;
    },
    // 左斜线是否满足
    judgmentLeftSlash(pointNumber, arr) {
      const x = pointNumber % 20;
      const y = Math.floor(pointNumber / 20);
      let startX = x > 4 ? 4 : x - 1;
      let startY = y > 3 ? 4 : y;
      let startDistance = Math.min(startX, startY);
      const endX = x > 16 ? 20 - x : 4;
      const endY = y > 15 ? 19 - y : 4;
      let endDistance = Math.min(endX, endY);
      let tempArr = [];
      let drawPoints = [];
      let isWin = false;
      const sortArr = arr.slice().sort((a, b) => a - b);
      while (startDistance >= 0) {
        tempArr.push((y - startDistance) * 20 + (x - startDistance));
        startDistance--;
      }
      let add = 1;
      while (add <= endDistance) {
        tempArr.push((y + add) * 20 + (x + add));
        add++;
      }
      const lastPoints = tempArr[tempArr.length - 1]
      sortArr.some(item => {
        if (tempArr.includes(item)) {
          drawPoints.push(item);
        }
        return item > lastPoints;
      })

      if (drawPoints.length >= 5) {
        let continuous = 0;
        let firstNum = drawPoints[0];
        isWin = drawPoints.some((num, index) => {
          if (num === firstNum + (index * 20 + index)) {
            continuous++;
          } else {
            firstNum = num;
            continuous = 1;
          }
          return continuous >= 5;
        })
      }
      return isWin;
    },
    // 右斜线是否满足
    judgmentRightSlash(pointNumber, arr) {
      const sortArr = arr.slice().sort((a, b) => a - b);
      const curX = pointNumber % 20;
      const curY = Math.floor(pointNumber / 20);
      const rightXDistance = curX > 16 ? 20 - curX : 4;
      const rightYDistance = curY > 3 ? 4 : curY;
      let startDistance = Math.min(rightXDistance, rightYDistance);
      const leftXDistance = curX > 4 ? 4: curX;
      const leftYDistance = curY > 15 ? 19 - curY : 4;
      let endDistance = Math.min(leftXDistance, leftYDistance);
      let tempArr = [];
      let drawPoints = [];
      let isWin = false;
      while (startDistance >= 0) {
        tempArr.push((curY - startDistance) * 20 + (curX + startDistance));
        startDistance--;
      }
      let add = 1;
      while (add <= endDistance) {
        tempArr.push((curY + add) * 20 + (curX - add));
        add++;
      }
      const lastPoints = tempArr[tempArr.length - 1];
      sortArr.some(item => {
        if (tempArr.includes(item)) {
          drawPoints.push(item);
        }
        return item > lastPoints;
      })

      if (drawPoints.length >= 5) {
        let continuous = 0;
        let firstNum = drawPoints[0];
        isWin = drawPoints.some((item, index) => {
          if (item === firstNum + (index * 20 - index)) {
            continuous++;
          } else {
            firstNum = item;
            continuous = 1;
          }
          return continuous >= 5;
        })
      }
      return isWin;
    }
  }
}
</script>

<style scoped>
/*.canvas {*/
/*  border: 1px solid #eee;*/
/*  border-radius: 5px;*/
/*}*/
</style>