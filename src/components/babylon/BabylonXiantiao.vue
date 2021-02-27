<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import * as BABYLON from '@babylonjs/core'
import BabylonGl from "@/components/babylon/BabylonGl";
export default {
  name: "BabylonXiantiao",
  data() {
    return {
      engine: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const canvas = this.$refs.canvas
      canvas.width = 800
      canvas.height = 600

      // 创建引擎
      this.engine = new BABYLON.Engine(canvas, true)
      // 创建场景
      // const lineScene = this.createLines(canvas)
      // const deltaScene = this.createDelta(canvas)
      const positionScene = this.createPosition(canvas)

      this.engine.runRenderLoop(() => {
        // lineScene.render()
        // deltaScene.render()
        positionScene.render()
      })
    },
    // 线条
    createLines(canvas) {
      const engine = this.engine
      const scene = new BABYLON.Scene(engine)
      // 添加相机
      const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, BABYLON.Vector3.Zero(), scene)
      camera.setPosition(new BABYLON.Vector3(1, -1, -1))
      camera.attachControl(canvas, true)

      // 添加光源
      // const light = new BABYLON.HemisphericLight('hemi', new BABYLON.Vector3(0, 1, 0), scene)

      const myPoints = [
        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(0, 1, 1),
        new BABYLON.Vector3(0, 1, 0)
      ]

      const lines = BABYLON.MeshBuilder.CreateLines(
        'lines',
        {
          points: myPoints,
          colors: [
            new BABYLON.Color4(0.2, 0.3, 0.1, 1),
            new BABYLON.Color4(0.5, 0.2, 0.3, 1),
            new BABYLON.Color4(0.7, 0.5, 0.9, 1)
          ],
          updatable: true
        },
        scene)
      const myTwoPoints = [
        new BABYLON.Vector3(0, 0, 1),
        new BABYLON.Vector3(0, 0.5, 0.5),
        new BABYLON.Vector3(0, 0.5, 0)
      ]
      const linesTwo = BABYLON.MeshBuilder.CreateLines(
        'lines',
        {
          points: myTwoPoints,
          instance: lines
        })

      return scene
    },
    // 陀螺线
    createDelta(canvas) {
      const scene = new BABYLON.Scene(this.engine)
      const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, BABYLON.Vector3.Zero(), scene)
      camera.setPosition(new BABYLON.Vector3(5, 5, -5))
      camera.attachControl(canvas, true)

      const light = new BABYLON.HemisphericLight('hemi', new BABYLON.Vector3(0, 1, 0), scene)

      var myPoints = []

      const deltaTheta = 0.1
      let deltaY = 0.005
      let radius = 1
      let theta = 0
      let Y = 0

      for (let i = 0; i < 400; i++) {
        myPoints.push(new BABYLON.Vector3(radius * Math.cos(theta), Y, radius * Math.sin(theta)))
        theta += deltaTheta
        Y += deltaY
      }

      const lines = BABYLON.MeshBuilder.CreateLines('lines', { points: myPoints, updatable: true}, scene)

      myPoints = []
      deltaY = 0.001
      radius = 0.25
      theta = 0
      Y = 0

      for (let i = 0; i < 400; i++) {
        myPoints.push(new BABYLON.Vector3(radius * Math.cos(theta), Y, radius * Math.sin(theta)))
        theta += deltaTheta
        Y += deltaY
      }
      const lineTwo = BABYLON.MeshBuilder.CreateLines('lines', { points: myPoints, instance: lines}, scene)
      return scene
    },
    // 物体的位置
    createPosition(canvas) {
      const scene = new BABYLON.Scene(this.engine)
      // 设置场景背景
      scene.clearColor = new BABYLON.Color3(.4, .5, .5)
      // 设置相机
      const camera = new BABYLON.ArcRotateCamera('camera1', 0, 0, 0, new BABYLON.Vector3(2, 3, 4), scene)
      camera.setPosition(new BABYLON.Vector3(10, 3, -10))
      camera.attachControl(canvas, true)
      // 设置灯光
      const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, .5, 0), scene)
      light.intensity = 0.8;
      // 新建圆柱
      const body = BABYLON.MeshBuilder.CreateCylinder('body',
        {
          height: 0.75, // 高度
          diameterTop: 0.2, // 头部直径
          diameterBottom: 0.5, // 底部直径
          tessellation: 6, // 曲面分为几分
          subdivisions: 1
        },
        scene
      )
      // 新建一个长方体
      const arm = BABYLON.MeshBuilder.CreateBox('arm', {
        height: 0.75,
        width: 0.3,
        depth: 0.1875 // 厚度
      }, scene)
      arm.position.x = 0.125

      // 把刚才生成的两个图形组合起来
      const pilot = BABYLON.Mesh.MergeMeshes([body, arm], true)
      // 生成一个坐标系
      const localOrigin = this.localAxes(2, scene)
      // 为刚才生成的坐标系设置父节点为刚才拼接的物体.
      localOrigin.parent = pilot
      pilot.position = new BABYLON.Vector3(2, 3, 4)
      // 沿着局部坐标系旋转
      // pilot.addRotation(Math.PI / 2, 0, 0).addRotation(0, Math.PI / 2, 0).addRotation(0, 0, Math.PI / 2)
      // pilot.addRotation(0, 0, Math.PI / 2).addRotation( Math.PI / 2, 0, 0).addRotation( 0, Math.PI / 2, 0)
      // 以下旋转使用的是世界坐标系
      // 沿 X 轴旋转 90°
      // pilot.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0)
      // pilot.rotation.x = Math.PI / 2
      // 沿 Y 轴旋转 90°
      pilot.rotation.y = Math.PI / 2
      // 沿 Z 轴旋转 90°
      // pilot.rotation.z = Math.PI / 2
      pilot.rotation.x = Math.PI / 2
      // pilot.rotation.y = Math.PI / 2
      pilot.rotation.z = Math.PI / 2
      // 缩放物体
      // pilot.scaling.x = 0.5
      // pilot.scaling.y = 0.5
      // pilot.scaling.z = 0.5
      // 设置世界坐标系
      this.showAxis(8, scene)
      return scene
    },
    localAxes(size, scene) {
      // 生成 X 轴,总共有五个点,生成了一根带箭头的直线.
      const pilot_local_axisX = BABYLON.MeshBuilder.CreateLines('pilot_local_axisX', {
        points: [
          new BABYLON.Vector3.Zero(),
          new BABYLON.Vector3(size, 0, 0),
          new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
          new BABYLON.Vector3(size, 0, 0),
          new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
        ]
      }, scene)
      pilot_local_axisX.color = new BABYLON.Color3(1, 0, 0)

      const pilot_local_axisY = BABYLON.MeshBuilder.CreateLines('pilot_local_axisY', {
        points: [
          new BABYLON.Vector3.Zero(),
          new BABYLON.Vector3(0, size, 0),
          new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
          new BABYLON.Vector3(0, size, 0),
          new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
        ]
      }, scene)
      pilot_local_axisY.color = new BABYLON.Color3(0, 1, 0)

      const pilot_local_axisZ = BABYLON.MeshBuilder.CreateLines('pilot_local_axisZ', {
        points: [
          new BABYLON.Vector3.Zero(),
          new BABYLON.Vector3(0, 0, size),
          new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
          new BABYLON.Vector3(0, 0, size),
          new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
        ]
      }, scene)
      pilot_local_axisZ.color = new BABYLON.Color3(0, 0, 1)

      // 生成一个box
      const local_origin = BABYLON.MeshBuilder.CreateBox('local_origin', {
        size: 1
      }, scene)
      // 隐藏这个 box
      local_origin.isVisible = false
      // 刚才生成的三条线添加到 box 上.
      pilot_local_axisX.parent = local_origin
      pilot_local_axisY.parent = local_origin
      pilot_local_axisZ.parent = local_origin

      return local_origin
    },
    showAxis(size, scene) {
      // 绘制坐标名称
      var makeTextPlane = function (text, color, size) {
        // 新建一个动态纹理
        const dynamicTexture = new BABYLON.DynamicTexture('DynamicTexture', 50, scene, true)
        dynamicTexture.hasAlpha = true
        // 使用纹理绘制文本
        dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true)
        const plane = new BABYLON.MeshBuilder.CreatePlane('TextPlane', {
          size
        }, scene, true)
        // 创建材质
        plane.material = new BABYLON.StandardMaterial('TextPlaneMaterial', scene)
        plane.material.backFaceCulling = false
        plane.material.specularColor = new BABYLON.Color3(0, 0, 0) // 镜面颜色
        plane.material.diffuseTexture = dynamicTexture
        return plane
      }

      var axisX = BABYLON.MeshBuilder.CreateLines('axisX', {
        points: [
          new BABYLON.Vector3.Zero(),
          new BABYLON.Vector3(size, 0, 0),
          new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
          new BABYLON.Vector3(size, 0, 0),
          new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
        ]
      }, scene)
      axisX.color = new BABYLON.Color3(1, 0, 0)
      const xChar = makeTextPlane("X", "red", size / 10)
      xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0)

      const axisY = BABYLON.MeshBuilder.CreateLines('axis:Y', {
        points: [
          new BABYLON.Vector3.Zero(),
          new BABYLON.Vector3(0, size, 0),
          new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
          new BABYLON.Vector3(0, size, 0),
          new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
        ]
      }, scene)
      axisY.color = new BABYLON.Color3(0, 1, 0)
      const yChar = makeTextPlane("Y", "green", size / 10)
      yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size)

      const axisZ = BABYLON.MeshBuilder.CreateLines('axisZ', {
        points: [
          new BABYLON.Vector3.Zero(),
          new BABYLON.Vector3(0, 0, size),
          new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
          new BABYLON.Vector3(0, 0, size),
          new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
        ]
      }, scene)
      axisZ.color = new BABYLON.Color3(0, 0, 1)
      const zChar = makeTextPlane('Z', 'blue', size / 10)
      zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.95 * size)
    }
  }
}
</script>

<style scoped>

</style>