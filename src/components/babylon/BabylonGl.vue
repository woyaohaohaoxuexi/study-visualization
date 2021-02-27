<template>
  <div>
    <canvas ref="canvas" touch-action="none"></canvas>
  </div>
</template>

<script>
import * as BABYLON from '@babylonjs/core'
export default {
  name: "BabylonGl",
  data() {
    return {

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
      const engine = new BABYLON.Engine(canvas, true)
      // 创建场景
      const scene = new BABYLON.Scene(engine)
      // 添加一个相机，并绑定鼠标事件
      const camera = new BABYLON.ArcRotateCamera(
        "Camera",
        Math.PI / 2,
        Math.PI / 2,
        2,
        BABYLON.Vector3.Zero(),
        scene
      )
      camera.attachControl(canvas, true)

      var light1 = new BABYLON.HemisphericLight(
        'light1',
        new BABYLON.Vector3(0.5, 0.5, 0),
        scene
      )

      // var light2 = new BABYLON.PointLight(
      //   'light2',
      //   new BABYLON.Vector3(0, 1, -1),
      //   scene
      // )
      // 添加一个球体
      var sphere = BABYLON.MeshBuilder.CreateSphere(
        'sphere',
        {
          diameter: 2,
          // arc: 0.5,
          // slice: 0.5,
          sideOrientation: 2
        },
        scene
      )
      sphere.position.y = 1
      // 添加平面
      var plane = BABYLON.MeshBuilder.CreatePlane('plane', {
        height: 2,
        width: 1,
        sourcePlane: new BABYLON.Plane(0, 0, 1, 0),
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
      }, scene)
      // 添加地面
      // var ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene)
      engine.runRenderLoop(function() {
        scene.render()
      })

      window.addEventListener('resize', function() {
        engine.resize()
      })
    }
  }
}
</script>

<style scoped>

</style>