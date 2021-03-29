<template>
  <div ref="echarts" class="echarts"></div>
</template>

<script>
export default {
  name: "EchartsGraphic",
  data() {
    return {
      myChart: null,

    }
  }
}
</script>

<style scoped>
.echarts {
  width: 800px;
  height: 600px;
  margin: 10px auto;
}
</style>