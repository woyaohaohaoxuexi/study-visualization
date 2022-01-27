<template>
  <div class='translate'>
    <canvas ref="canvas" class="canvas"></canvas>

  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const canvas = this.$refs.canvas;
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      ctx.moveTo(76, 256);
      ctx.beginPath();
      ctx.moveTo(76, 256);
      ctx.lineTo(176, 156);
      ctx.lineTo(276, 256);
      ctx.stroke();
      ctx.moveTo(236, 256);
      ctx.lineTo(336, 156);
      ctx.lineTo(436, 256);
      ctx.stroke();
      ctx.moveTo(311, 106);
      ctx.arc(256, 106, 55, 0, Math.PI * 2);
      ctx.stroke();

      // ctx.translate(256, 256);
      // ctx.scale(1, -1);
      // ctx.beginPath();
      // ctx.moveTo(-180, 0);
      // ctx.lineTo(-80, 100);
      // ctx.lineTo(20, 0);
      // ctx.stroke();
      // ctx.moveTo(-20, 0);
      // ctx.lineTo(80, 100);
      // ctx.lineTo(180, 0);
      // ctx.stroke();
      // ctx.moveTo(55, 150);
      // ctx.arc(0, 150, 55, 0, Math.PI * 2);
      // ctx.stroke();
    }
  },
  components: {

  },
}
</script>

<style scoped lang="scss">
.canvas {
  border: 1px solid #eee;
}
</style>
