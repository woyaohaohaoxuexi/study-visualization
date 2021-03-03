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
    async initMap() {
      const options = await this.generateOption()
      console.log('OPTIONS', options)
      this.myChart.setOption(options)

      this.myChart.getZr().on('click', params => {
        const cursor = this.$refs.echartsContent.children[0].style.cursor
        console.log('当前鼠标样式', cursor) // default pointer
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
      return new Promise(resolve => {
        Promise.all([
          this.loadImage('/src/mountain-1.png'),
          this.loadImage('/src/soil-1.png')
        ]).then(imgArr => {
          console.log('图片加载', imgArr)
          resolve({
            geo3D: [
              {
              show: true,
              map: '青岛',
              boxWidth: 60,
              regionHeight: 4.5,
              itemStyle: {
                color: [1, 1, 1, 1],
                opacity: 1,
                borderWidth: 2,
                borderColor: '#aaa'
              },
              emphasis: {
                label: {
                  show: false
                },
                itemStyle: {
                  color: [1, 0, 1, 1]
                }
              },
              shading: 'realistic',
              realisticMaterial: {
                detailTexture: imgArr[0]
              }
            },
              {
                show: true,
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
                }
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