<template>
  <div ref="echartsContent" class="content"></div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-gl'
export default {
  name: "EchartsMap",
  data() {
    return {
      myChart: null,
      curCheckArea: '',
      scatters: null,
      regions: null
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.echartsContent)
    this.init()
  },
  methods: {
    init() {
      fetch('/src/370200.json')
        .then(res => res.json())
        .then(map => {
          this.regions = map.features.map(item => {
            return {
              name: item.properties.name,
              height: 4
            }
          })
          this.scatters = map.features.map(item => {
            return {
              name: item.properties.name,
              value: item.properties.center
            }
          })
          console.log('地图数据', map)
          console.log('SCATTERS ', this.scatters)
          echarts.registerMap('青岛', map)
          this.initMap()
        })
    },
    initMap() {
      const options = this.generateOption()
      console.log('OPTIONS', options)
      this.myChart.setOption(options)

      this.myChart.on('click', params => {
        const { name } = params
        console.log('click', params)
        let action = 'open'
        if (name === this.curCheckArea) {
          action = 'close'
          this.curCheckArea = ''
        } else {
          this.curCheckArea = name
        }
        this.handlerClick(name, action)
      })
    },
    handlerClick(name, action) {
      const options = this.generateOption()
      const tempData = options.series[0].data
      console.log('ACTION ', action)
      options.series[0].data = tempData.map(item => {
        if (item.name === name && action === 'open') {
          item.height = 6
          if (!item.itemStyle) {
            item.itemStyle = {
              // borderWidth: 0,
              borderColor: 'red'
            }
          } else {
            item.itemStyle.borderColor = 'red'
          }

        } else {
          item.height = 4
          item.itemStyle = {
            borderWidth: 2,
            borderColor: '#7d7d7d'
          }
        }
        return item
      })
      console.log('NEW OPTIONS', options)
      this.myChart.setOption(options)
    },
    generateOption() {
      return {
        geo3D: {
          // show: true,
          map: '青岛',
          boxWidth: 60,
          regionHeight: 3.9,
          itemStyle: {
            color: [0.5, 0, 0.7, 0],
            opacity: 0
          },
          emphasis: {
            label: {
              show: false
            }
          }
        },
        series: [
          // {
          //   type: 'map3D',
          //   name: 'map',
          //   map: '青岛',
          //   boxWidth: 60,
          //   regionHeight: 4,
          //   itemStyle: {
          //     color: 'rgba(200, 220, 180, 1)',
          //     opacity: 1,
          //     borderWidth: 2,
          //     borderColor: '#7d7d7d'
          //   },
          //   label: {
          //     show: true,
          //     distance: 0,
          //     formatter(params) {
          //       // console.log('formatter Params', params)
          //       return params.name
          //     },
          //     textStyle: {
          //       color: 'skyblue',
          //       borderWidth: 5,
          //       fontSize: 18,
          //       fontWeight: 700,
          //       borderColor: 'red'
          //     }
          //   },
          //   emphasis: {
          //     label: {
          //       show: true,
          //       formatter(params) {
          //         // 可以监听到 hover 事件
          //         return params.name
          //       },
          //       textStyle: {
          //         color: 'blue'
          //       }
          //     },
          //     itemStyle: {
          //       color: 'green',
          //       opacity: 0.8,
          //       height: 6
          //     }
          //   },
          //   data: this.regions
          // },
          {
            type: 'scatter3D',
            id: 'scatter',
            name: 'scatter',
            coordinateSystem: 'geo3D',
            // symbol: 'image://src/qipao.png',
            symbol: 'circle',
            symbolSize: 50,
            itemStyle: {
              color: 'skyblue',
              // borderWidth: 2
            },
            // dimensions: ['lng', 'lat'],
            data: this.scatters
          },
          /*{*/
          /*  type: 'effectScatter',*/
          /*  effectType: 'ripple',*/
          /*  showEffectOn: 'render',*/
          /*  coordinateSystem: 'geo3D',*/
          /*  symbol: 'roundRect',*/
          /*  symbolRotate: 360,*/
          /*  itemStyle: {*/
          /*    color: {*/
          //       type: 'linear',
          //       x: 0,
          //       y: 0,
          //       x2: 0,
          //       y2: 1,
          //       colorStops: [{
          //         offset: 0, color: 'red' // 0% 处的颜色
          //       }, {
          //         offset: 1, color: 'blue' // 100% 处的颜色
          //       }],
          //       global: false // 缺省为 false
          //     },
          //   },
          //   data: this.scatters,
          //   animation: true,
          //   animationDuration: function(index) {
          //     return index * 100
          //   }
          // }
        ]
      }
    }
  }
}
</script>

<style scoped>
.content {
  width: 600px;
  height: 500px;
  margin: 0 auto;
}
</style>