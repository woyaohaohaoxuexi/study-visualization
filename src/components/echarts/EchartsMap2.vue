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
      regions: null,
      curHoverArea: '',
      options: null
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
              height: 4.5
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
    async initMap() {
      const options = await this.generateOption()
      console.log('OPTIONS', options)
      this.options = options
      this.myChart.setOption(options)

      this.myChart.getZr().on('click', async params => {
        const cursor = this.$refs.echartsContent.children[0].style.cursor
        const curHoverArea = this.curHoverArea
        console.log('当前鼠标样式', cursor) // default pointer
        console.log('当前高亮区域', this.curHoverArea)

        if (cursor === 'pointer' && curHoverArea) {
          const newOptions = await this.generateOption()
          console.log('数据', options.geo3D[0].regions)
          // const data = options.geo3D[0].regions.map(item => {
          //   if (item.name === curHoverArea) {
          //     item.height = 6
          //   } else {
          //     item.height = 4.5
          //   }
          //   return item
          // })
          newOptions.geo3D[0].regions.forEach(item => {
            if (item.name === curHoverArea) {
              item.height = 6
            } else {
              item.height = 4.5
            }
          })

          // options.geo3D[0].data.forEach(item => {
          //   if (item.name === curHoverArea) {
          //     item.height = 5
          //   } else {
          //     item.height = 4
          //   }
          // })
          // console.log('OPTIONS ', data)
          this.myChart.setOption(newOptions)
        }
      })
    },
    loadImage(src) {
      return new Promise(resolve => {
        const img = new Image
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          resolve(img)
        }
        img.src = src
      })
    },
    generateOption() {
      const _this = this
      return new Promise(resolve => {
        Promise.all([
          this.loadImage('/src/mountain-1.png'),
          this.loadImage('/src/soil-1.png')
        ]).then(imgArr => {
          resolve({
            geo3D: [
              {
                show: true,
                name: 'topMap',
                map: '青岛',
                boxWidth: 60,
                regionHeight: 4.5,
                top: 'top',
                itemStyle: {
                  color: [1, 1, 1, 1],
                  opacity: 1,
                  borderWidth: 2,
                  borderColor: '#aaa'
                },
                emphasis: {
                  label: {
                    show: true,
                    formatter(params) {
                      console.log('hover', params)
                      _this.curHoverArea = params.name
                      return params.name
                    }
                  },
                  itemStyle: {
                    color: [1, 0, 1, 1]
                  }
                },
                shading: 'realistic',
                realisticMaterial: {
                  detailTexture: imgArr[0]
                },
                viewControl: {
                  projection: 'perspective', // perspective orthographic
                  // autoRotate: true,
                  autoRotateDirection: 'cw',
                  autoRotateAfterStill: 1.5,

                  distance: 100,
                  minDistance: 80,
                  maxDistance: 200,
                  zoomSensitivity: 2,
                  rotateSensitivity: [2, 1],
                  // alpha: 60, // 绕 x 轴旋转角度，也就是上下角度
                  // beta: 0,  // 绕 y 轴旋转角度，也就是左右角度
                  maxAlpha: 90,
                  minBeta: -3600,
                  maxBeta: 3600,
                  animation: true,
                  animationDurationUpdate: 1500,
                  animationEasingUpdate: 'cubicInOut'
                },
                regions: this.regions
              },
              {
                show: true,
                name: 'bottomMap',
                map: '青岛',
                boxWidth: 60,
                regionHeight: 3.9,
                itemStyle: {
                  color: [1, 1, 1, 1],
                  opacity: 1
                },
                emphasis: {
                  label: {
                    show: false
                  }
                },
                shading: 'realistic',
                realisticMaterial: {
                  detailTexture: imgArr[1]
                },
                viewControl: {
                  projection: 'perspective', // perspective orthographic
                  // autoRotate: true,
                  autoRotateDirection: 'cw',
                  autoRotateAfterStill: 1.5,

                  distance: 100,
                  minDistance: 80,
                  maxDistance: 200,
                  zoomSensitivity: 2,
                  rotateSensitivity: [2, 1],
                  // alpha: 60, // 绕 x 轴旋转角度，也就是上下角度
                  // beta: 0,  // 绕 y 轴旋转角度，也就是左右角度
                  maxAlpha: 90,
                  minBeta: -3600,
                  maxBeta: 3600,
                  animation: true,
                  animationDurationUpdate: 1500,
                  animationEasingUpdate: 'cubicInOut'
                },
              },
            ],
            series: [
              {
                type: 'scatter3D',
                id: 'scatter',
                name: 'scatter',
                coordinateSystem: 'geo3D',
                symbol: 'image://src/qipao.png',
                // symbol: 'pin',
                symbolSize: 50,
                itemStyle: {
                  // color: 'skyblue',
                  // borderWidth: 2
                },
                // dimensions: ['lng', 'lat'],
                data: this.scatters
              }
            ]
          })
        })
      })
    }
  }
}
</script>

<style scoped>
.content {
  width: 1200px;
  height: 1000px;
  margin: 0 auto;
}
</style>