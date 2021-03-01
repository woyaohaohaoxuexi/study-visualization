<template>
  <div>
    <canvas ref="canvas" touch-action="none"></canvas>
  </div>
</template>

<script>
import * as BABYLON from '@babylonjs/core'
import '@babylonjs/loaders'
export default {
  name: "BabylonGl",
  data() {
    return {
      engine: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const canvas = this.$refs.canvas
      canvas.width = 800
      canvas.height = 600
      // 创建引擎
      this.engine = new BABYLON.Engine(canvas, true)
      // 创建场景
      const tanScene = await this.createTan()

      this.engine.runRenderLoop(function() {
        tanScene.render()
      })
    },
    // 碳原子
    createTan() {
      return new Promise((res, rej) => {
        const scene = new BABYLON.Scene(this.engine)
        BABYLON.SceneLoader.Append('/src/', 'beike.gltf', scene, function (scene) {
          console.log('是否加载成功', scene)
          scene.createDefaultCameraOrLight(true, true, true)
          scene.activeCamera.alpha += Math.PI
          res(scene)
        })
      })
    }
  }
}
</script>

<style scoped>

</style>