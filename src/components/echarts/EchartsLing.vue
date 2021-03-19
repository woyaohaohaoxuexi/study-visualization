<template>
  <div ref="echarts" class='content'>

  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: '',
  data() {
    return {
      myEcharts: null
    }
  },
  mounted() {
    this.myEcharts = echarts.init(this.$refs.echarts)
    this.testOne()
  },
  methods: {
    // test
    testOne() {
      const options = {
        tooltip: {},
        legend: {},
        dataset: {
          source: [
            ['product', '数值'],
            ['海洋渔业', 3],
            ['海洋盐业', 2],
            ['海洋汽油业', 1],
            ['海洋化工业', 6],
            ['海水利用业', 2]
          ]
        },
        xAxis: {
          show: true,
          type: 'category',
          // name: '产业名称',
          // nameLocation: 'center',
          // nameTextStyle: {
          //   color: '#ff0000',
          //   lineHeight: 50,
          //   backgroundColor: 'green'
          // },
          // nameGap: 20,
          // nameRotate: 30,
          boundaryGap: true
        },
        yAxis: {},
        series: [{
          type: 'bar',
          barWidth: 20,

        }]
      }
      const testOption = {
          // legend: {},
          // tooltip: {},
          dataset: {
              // 提供一份数据。
              source: [
                  ['product', '2015', '2016', '2017'],
                  ['Matcha Latte', 43.3, 85.8, 93.7],
                  ['Milk Tea', 83.1, 73.4, 55.1],
                  ['Cheese Cocoa', 86.4, 65.2, 82.5],
                  ['Walnut Brownie', 72.4, 53.9, 39.1]
              ]
          },
          // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
          xAxis: {type: 'category'},
          // 声明一个 Y 轴，数值轴。
          yAxis: {},
          // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
          series: [
              {type: 'bar'},
              // {type: 'bar'},
              // {type: 'bar'}
          ]
      }
      this.myEcharts.setOption(options)
    }
  }
}
</script>

<style scoped lang="scss">
.content {
  width: 800px;
  height: 800px;
  margin: 10px auto;
}
</style>