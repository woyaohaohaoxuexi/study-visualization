<template>
  <div ref="content" class="content"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: "EchartsOne",
  data() {
    return {
      myChart: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.myChart = echarts.init(this.$refs.content)
      // 柱状图
      // this.createBar()
      // 绘制南丁格尔图
      // this.createPie()
      // 数据集绘制
      this.createDataset()
    },
    // 绘制柱状图
    createBar() {
      this.myChart.setOption({
        title: {
          text: 'Echarts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    },
    // 南丁格尔图
    createPie() {
      this.myChart.setOption({
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            data: [
              {value: 235, name: '视频广告'},
              {value: 274, name: '联盟广告'},
              {value: 310, name: '邮件营销'},
              {value: 335, name: '直接访问'},
              {value: 400, name: '搜索引擎'}
            ],
            roseType: 'angle',
            itemStyle: {
              // shadowBlur: 200,
              // shadowOffsetX: 0,
              // shadowOffsetY: 0,
              // shadowColor: 'rgba(0, 0, 0, 0.5)',
              // emphasis: {
              //   shadowBlur: 200,
              //   shadowColor: 'skyblue'
              // }
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            // label: {
            //   backgroundColor: 'red',
            //   fontSize: 20
            // },
            labelLine: {
              smooth: true,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            }
          }
        ],
        backgroundColor: '#2c343c',
        textStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        },
        visualMap: {
          show: true,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [1, 0]
          }
        }
      })
    },
    // 数据集
    createDataset() {
      // 下面这种方式是: x 轴设置的类型是类目,默认就会取数据的第一列,series 系列配置了三组,默认对应数据的第二列到第四列.
      this.myChart.setOption({
        legend: {},
        tooltip: {},
        dataset: {
          // 提供一份数据
          source: [
            ['test', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
          ]
        },
        xAxis: { type: 'category'},
        yAxis: {},
        series: [
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'}
        ]
      })
    },
    // 维度
    createDimension() {
      this.myChart.setOption({
        dataset: {
          // 提供一份数据
          source: [
            ['test', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
          ]
        },
        xAxis: { type: 'category'},
        yAxis: {},
        series: [
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'}
        ]
      })
    }
  }
}
</script>

<style scoped>
.content {
  width: 600px;
  height: 400px;
}
</style>