<template>
  <div ref="echarts" class="echarts"></div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-gl'
export default {
  name: "EchaertsSurface",
  data() {
    return {
      myChart: null
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.echarts)
    this.init()
  },
  methods: {
    init() {
      const options = {
        grid3D: {
          show: true,
          axisLine: {
            show: true,
            interval: 'auto',
            lineStyle: {
              color: 'red',
              width: 1
            }
          },
          axisLabel: {
            show: true
          },
          splitLine: {
            show: true,
          },
          // splitArea: {
          //   show: true,
          //   areaStyle: {
          //     color: 'skyblue'
          //   }
          // },
          axisPointer: {
            show: true,
            lineStyle: {
              color: 'orange'
            }
          },
          temporaSuperSampling: { // 分帧超采样
            enable: true
          },
          viewControl: { // 设置视图控制
            rotateSensitivity: 1, // 旋转操作的灵敏度，为 0 无法旋转
            zoomSensitivity: 1,   // 缩放操作的灵敏度
            animation: true
          }
        },
        xAxis3D: {
          splitLine: {
            show: true,
            lineStyle: {
              color: 'blue'
            }
          }
        },
        yAxis3D: {},
        zAxis3D: {
          min: -1,
          max: 1
        },
        series: [
          {
            type: 'surface',
            parametric: true,
            wireframe: {
              show: true
            },
            parametricEquation: {
              u: {
                min: -Math.PI * 2,
                max: Math.PI * 2,
                step: Math.PI / 30
              },
              v: {
                min: -Math.PI * 2,
                max: Math.PI * 2,
                step: Math.PI / 30
              },
              x: function(u, v) {
                const startRa = Math.PI * 2 * 0.2
                const endRa = Math.PI * 2 * 0.6
                if (u < startRa) {
                  return Math.cos(startRa) * (1 + Math.cos(v) * 0.3)
                } else if (u > endRa) {
                  return Math.cos(endRa) * (1 + Math.cos(v) * 0.3)
                }
                return Math.cos(u) * (1 + Math.cos(v) * 0.3)
              },
              y: function(u, v) {
                const startRa = Math.PI * 2 * 0.2
                const endRa = Math.PI * 2 * 0.6
                if (u < startRa) {
                  return Math.sin(startRa) * (1 + Math.cos(v) * 0.3)
                } else if (u > endRa) {
                  return Math.sin(endRa) * (1 + Math.cos(v) * 0.3)
                }
                return Math.sin(u) * (1 + Math.cos(v) * 0.3)
              },
              z: function(u, v) {
                return Math.sin(v) > 0 ? 0.2 : -0.2
              }
            },
            itemStyle: {
              color: 'green'
            }
          }
        ]
      }

      this.myChart.setOption(options)
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
