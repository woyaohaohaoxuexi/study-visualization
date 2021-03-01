<template>
  <div ref="mapContent" class="content"></div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-gl'
export default {
  name: "EchartsGl",
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
      this.get3DMap()
    },
    // 配置的 map3D
    getQingDaoMap() {
      fetch('/src/370200.json')
        .then(res => res.json())
        .then(res => {
          console.log('地图数据', res)
          echarts.registerMap('青岛', res)
          const img = new Image()
          img.src = '/src/ditu.png'
          img.onload = () => {
            this.myChart.setOption({
              series: [
                {
                  name: '青岛',
                  type: 'map3D',
                  map: '青岛',
                  boxDepth: 100,
                  // regionHeight: 4,
                  // 画布全景
                  environment: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0, color: '#00aaff' // 天空颜色
                  }, {
                    offset: 0.7, color: '#998866' // 地面颜色
                  }, {
                    offset: 1, color: '#998866' // 地面颜色
                  }], false),
                  // 地图背景
                  groundPlane: {
                    show: true,
                    color: '#aaa'
                  },
                  label: {
                    show: true,
                    distance: 4,
                    textStyle: {
                      color: 'skyblue'
                    }
                  },
                  itemStyle: {
                    // color: 'rgb(81, 107, 23)',
                    borderWidth: 2,
                    // borderColor: 'red'
                  },
                  data: [
                    {
                      name: '市南区',
                      value: 100,
                      // height: 5,
                      // itemStyle: {
                      //   opacity: 0.5,
                      //   borderColor: '#333'
                      // }
                      emphasis: {
                        height: 10,
                        itemStyle: {
                          opacity: 0.5
                        }
                      }
                    },
                    {
                      name: '市北区',
                      value: 120,
                      regionHeight: 6
                    },
                    {
                      name: '黄岛区',
                      value: 140,
                      // height: 5,
                      emphasis: {
                        itemStyle: {
                          opacity: 0.5
                        },
                        label: {
                          textStyle: {
                            color: 'red'
                          }
                        }
                      }
                    },
                    {
                      name: '崂山区',
                      value: 160,
                      regionHeight: 8
                    },
                    {
                      name: '李沧区',
                      value: 180,
                      regionHeight: 9
                    },
                    {
                      name: '城阳区',
                      value: 200,
                      regionHeight: 10
                    },
                    {
                      name: '即墨区',
                      value: 220,
                      regionHeight: 11
                    },
                    {
                      name: '胶州区',
                      value: 240,
                      regionHeight: 12
                    },
                    {
                      name: '平度市',
                      value: 260,
                      regionHeight: 13
                    },
                    {
                      name: '莱西市',
                      value: 280,
                      regionHeight: 14
                    }
                  ],
                  shading: 'realistic',
                  realisticMaterial: {
                    detailTexture: img,
                    roughness: 0.5
                  }
                }
              ]
            })

            this.myChart.on('click', function (params) {
              console.log('MOUSEOVER', params)
            })
          }
        })
    },
    // 配置的 geo3D
    getQingDaoMapTwo() {
      fetch('/src/370200.json')
        .then(res => res.json())
        .then(res => {
          console.log('地图数据', res)
          echarts.registerMap('青岛', res)
          const dataList = res.features.map((item, index) => {
            const { center, name } = item.properties
            return {
              name,
              value: [...center, 10 * index + 100]
            }
          })
          const img = new Image()
          img.src = '/src/ditu.png'
          img.onload = () => {
            this.myChart.setOption({
              geo3D: {
                // show: true,
                map: '青岛',
                boxDepth: 50,
                regionHeight: 3,
                environment: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0, color: '#00aaff' // 天空颜色
                }, {
                  offset: 0.7, color: '#998866' // 地面颜色
                }, {
                  offset: 1, color: '#998866' // 地面颜色
                }], false),
                label: {
                  show: true
                },
                itemStyle: {
                  borderWidth: 1,
                  borderColor: 'rgb(238, 238, 238)'
                },
                regions: [
                  {
                    name: '黄岛区',
                    // height: 5,
                    // regionHeight: 5,  // 不起作用
                    emphasis: {
                      label: {
                        textStyle: {
                          color: 'skyblue',
                          fontSize: 20
                        }
                      }
                    }
                  }
                ]
              },
              series: [
                {
                  type: 'bar3D',
                  coordinateSystem: 'geo3D',
                  data: dataList
                }
              ]
            })

            this.myChart.on('click', function (params) {
              console.log('MOUSEOVER', params)
            })
          }
        })
    },
    // 同时配置 geo3D 和 map3D
    get3DMap() {
      fetch('/src/370200.json')
        .then(res => res.json())
        .then(res => {
          console.log('地图数据', res)
          const { features } = res
          this.registerMap('青岛', res)

          this.myChart.on('click', params => {
            console.log('params', params)
            const { componentSubType, name } = params
            if (componentSubType === 'map3D' && name) {
              const mapData = features.find(item => item.properties.name === name)
              const code = mapData.properties.adcode

              this.registerMap(name, {
                type: 'FeatureCollection',
                features: [mapData]
              })
            }
          })
        })
    },
    registerMap(name, data) {
      this.myChart && this.myChart.dispose()
      this.myChart = echarts.init(this.$refs.mapContent)
      echarts.registerMap(name, data)
      let options = {
        // geo3D: {
        //   map: '青岛',
        //   itemStyle: {
        //     color: 'rgba(0, 0, 0, 0)',
        //     opacity: 0,
        //     borderColor: 'rgba(0, 0, 0 0)',
        //     borderWidth: 0
        //   }
        // },
        series: [
          {
            type: 'map3D',
            map: name,
            itemStyle: {
              color: 'rgba(1, 16, 31, 1)',
              opacity: 1,
              // borderColor: 'rgba(1, 16, 31, .6)',
              borderColor: 'red',
              borderWidth: 1
            },
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: true
              },
              itemStyle: {
                color: 'skyblue',
                opacity: 1
              }
            },
            zlevel: 1
          }
        ]
      }
      this.myChart.setOption(options, true)
    },
    handlerMousemove(params) {
      console.log('params', params)
    },
    getShaoXingMap() {
      fetch('/src/330600.json')
        .then(res => {
          console.log('获取json 数据', res)
          return res.json()
        })
        .then(res => {
          console.log('获取到的数', res.features)
          echarts.registerMap('绍兴', res)
          const chart = echarts.init(this.$refs.mapContent)
          let inputData = [565464, 117230.34, 74130.95, 41375.41, 43099.39, 127574.2, 86198.78, 75854.93];
          let data2 = [                // 可对单个地图区域进行设置
            {
              name: '越城区',
              value: inputData[2],
              itemStyle: {                // 单个区域的样式设置
                color: '#e78078',
              },
            },
            {
              name: '上虞区',
              value: inputData[4],
              itemStyle: {                // 单个区域的样式设置
                color: '#98a3af',
              },
            },
            {
              name: '柯桥区',
              value: inputData[3],
              itemStyle: {                // 单个区域的样式设置
                color: '#3f93d3',
              },
            },
            {
              name: '诸暨市',
              value: inputData[6],
              itemStyle: {                // 单个区域的样式设置
                color: '#1bbac4',
              }
            },
            {
              name: '嵊州市',
              value: inputData[7],
              itemStyle: {                // 单个区域的样式设置
                color: '#0ac88f',
              },
            },
            {
              name: '新昌县',
              value: inputData[5],
              itemStyle: {                // 单个区域的样式设置
                color: '#12c0ae',
              },
            }
          ];
          //构造
          let option = {
            tooltip: { // 提示框
              trigger: 'item',
              formatter: function (params) {
                //console.log(params)
                return params.name + ":" + params.value;
              }
            },
            series: [
              {
                name: '绍兴',
                type: 'map3D',
                map: '绍兴',  //必须和上面注册的地图名称一致，详细可以看ECharts的GL配置说明
                boxDepth: 100, //地图倾斜度
                regionHeight: 5, //地图厚度
                light: {
                  main: {
                    intensity: 1.5
                  }
                },
                label: {
                  show: true, //是否显示市
                  textStyle: {
                    color: "#333333", //文字颜色
                    fontSize: 16, //文字大小
                    fontFamily: '微软雅黑',
                    backgroundColor: "rgba(0,0,0,0)", //透明度0清空文字背景
                  },
                },
                data: data2,
                itemStyle: {
                  opacity: 1, // 透明度
                  borderWidth: 1, //分界线宽度
                  borderColor: "#808080", //分界线颜色
                  color: "#ffffff"
                },
                emphasis: {
                  itemStyle: {
                    color: "#D3D3D3"
                  },
                },
                groundplane: {
                  show: false
                },
                shading: 'realistic',
                // 真实感材质相关配置 shading: 'realistic'时有效
                realisticMaterial: {
                  detailTexture: '#fff', // 纹理贴图
                  textureTiling: 1, // 纹理平铺，1是拉伸，数字表示纹理平铺次数
                  roughness: 0, // 材质粗糙度，0完全光滑，1完全粗糙
                  metalness: 0, // 0材质是非金属 ，1金属
                  roughnessAdjust: 0
                },
                viewControl: {
                  distance: 135, // 地图视角 控制初始大小
                  rotateSensitivity: 1, // 旋转
                  zoomSensitivity: 1, // 缩放
                },
              }

            ],
          };
          chart.setOption(option);
        })
    }
  }
}
</script>

<style scoped>
.content {
  width: 800px;
  height: 600px;
}
</style>