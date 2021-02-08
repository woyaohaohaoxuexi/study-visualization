<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
export default {
  name: "meishu.vue",
  data() {
    return {

    }
  },
  mounted() {
    this.int()
  },
  methods: {
    init() {
      const canvas = this.$refs.canvas
      canvas.width = 800
      canvas.height = 600
      const ctx = canvas.getContext('2d')
      ctx.translate(0, canvas.height)
      ctx.scale(1, -1)



    }
  }
}
</script>

<style scoped>

</style>