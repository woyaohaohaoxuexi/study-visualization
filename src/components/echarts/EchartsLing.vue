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
    this.testTwo()
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
        grid: {
          // show: true,
          left: '10%',
          // top: 0,
          containLabel: false,
          // backgroundColor: '#e2e2e2',
          // borderColor: 'red'
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
          offset: 10,
          boundaryGap: true, // 柱子立在两个刻度中间。
          axisLine: { // 坐标轴样式
            show: false,
            // lineStyle: {
            //   color: 'red',
            // }
          },
          axisTick: {   // 坐标轴的刻度
            show: false,
            alignWithLabel: true,  // boundaryGap 为 true 时让刻度在柱子的中间
          },
          minorTick: {
            show: false
          },
          // splitLine: {  // 分割线，
          //   show: true,
          //   lineStyle: {
          //     type: 'dashed'
          //   }
          // },
          axisPointer: {  // 鼠标放上去的时候，需要展示的东西
            show: true,
          }
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [{
          type: 'bar',
          barWidth: 20,
          label: {  // 是否需要把数值显示到柱子上面
            show: false
          },
          itemStyle: {
            color: 'skyblue',
            // borderColor: 'red',
            // borderWidth: 1,
            // borderType: 'dashed'

          }
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
    },
    testTwo() {
      const options = {
        grid: {
          left: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          interval: 5,
          data: ['海洋产业1', '海洋渔业', '海洋盐业', '海洋旅游业']
        },
        yAxis: {
          interval: 2,
          min: -7,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [
          {
            type: 'bar',
            name: 'top',
            stack: '总数据',
            itemStyle: {
              color: 'rgba(0, 0, 0, 0)'
            },
            barWidth: 8,
            itemStyle: {
              color: 'skyblue',
              borderRadius: [4, 4, 0, 0]
            },
            data: [5, 4, 6, 7]
          },
          {
            type: 'bar',
            stack: '总数据',  // 相同系列设置了相同的这个值后，就会重叠绘制图形
            name: 'bottom',
            itemStyle: {
              color: 'skyblue',
              borderRadius: [0, 0, 4, 4]
            },
            data: [-1, -2, -4, -2]
          },
          {
            type: 'scatter',
            symbol: 'circle',
            symbolSize: 16,
            itemStyle: {
              opacity: 1
            },
            data: [
              [0.25, 5],
              [0.5, 4],
              [1.75, 6],
              [3, 7]
            ]
          },
          {
            type: 'scatter',
            symbol: 'circle',
            symbolSize: 16,
            itemStyle: {
              opacity: 1
            },
            data: [
              [0.25, -1],
              [0.5, -2],
              [1.75, -4],
              [3, -2]
            ]
          }
        ]
      }
      this.myEcharts.setOption(options)
    },
    testThree() {}
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