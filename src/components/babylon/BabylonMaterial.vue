<template>
  <div>
    <canvas ref="canvas" touch-action="none"></canvas>
  </div>
</template>

<script>
import * as BABYLON from '@babylonjs/core'
import * as GUI from '@babylonjs/gui/legacy/legacy'

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
    init() {
      const canvas = this.$refs.canvas
      canvas.width = 800
      canvas.height = 600
      // 创建引擎
      this.engine = new BABYLON.Engine(canvas, true)

      // 材质
      const materScene = this.createMaterial()
      // 纹理
      const textureScene = this.createTexture(canvas)
      this.engine.runRenderLoop(() => {
        // materScene.render()
        textureScene.render()
      })
    },
    // 生成材质、灯光
    createMaterial(canvas) {
      const scene = new BABYLON.Scene(this.engine)
      const camera = new BABYLON.ArcRotateCamera('Camera',
        -Math.PI / 2, Math.PI / 3,
        10, BABYLON.Vector3.Zero(),
        scene
      )
      camera.attachControl(canvas, true)
      const Color3 = BABYLON.Color3
      const mats = [
        new Color3(1, 1, 0),
        new Color3(1, 0, 1),
        new Color3(0, 1, 1),
        new Color3(1, 1, 1)
      ]

      // 新建一个材质
      const redMat = new BABYLON.StandardMaterial('redMat', scene)
      // 设置材质的自发光颜色
      redMat.emissiveColor = new Color3(1, 0, 0)

      const greenMat = new BABYLON.StandardMaterial('greenMat', scene)
      greenMat.emissiveColor = new Color3(0, 1, 0)

      const blueMat = new BABYLON.StandardMaterial('blueMat', scene)
      blueMat.emissiveColor = new Color3(0, 0, 1)

      const whiteMat = new BABYLON.StandardMaterial('whiteMat', scene)
      whiteMat.emissiveColor = new Color3(1, 1, 1)

      // 新建灯光
      const lightRed = new BABYLON.SpotLight('spotLight',
        new BABYLON.Vector3(-0.9, 1, -1.8),
        new BABYLON.Vector3(0, -1, 0),
        Math.PI / 2,
        1.5,
        scene
      )
      // 设置灯光的漫反射颜色
      lightRed.diffuse = new Color3(1, 0, 0)
      // 设置灯光的镜面反射颜色
      lightRed.specular = new Color3(0, 0, 0)

      const lightGreen = new BABYLON.SpotLight('spotLight1',
        new BABYLON.Vector3(0, 1, -0.5),
        new BABYLON.Vector3(0, -1, 0),
        Math.PI / 2,
        1.5,
        scene
      )
      lightGreen.diffuse = new Color3(0, 1, 0)
      lightGreen.specular = new Color3(0, 0, 0)

      const lightBlue = new BABYLON.SpotLight('spotLight2',
        new BABYLON.Vector3(0.9, 1, -1.8),
        new BABYLON.Vector3(0, -1, 0),
        Math.PI / 2,
        1.5,
        scene
      )
      lightBlue.diffuse = new Color3(0, 0, 1)
      lightBlue.specular = new Color3(0, 0, 0)

      const lightWhite = new BABYLON.SpotLight('spotLight3',
        new BABYLON.Vector3(0, 1, 1),
        new BABYLON.Vector3(0, -1, 0),
        Math.PI / 2,
        1.5,
        scene
      )
      lightWhite.diffuse = new Color3(1, 1, 1)
      lightWhite.specular = new Color3(0, 0, 0)

      // 创建一个球体
      const redSphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 0.25 }, scene)
      // 设置这个球体的材质
      redSphere.material = redMat
      // 设置这个球体的位置为红色灯光的位置
      redSphere.position = lightRed.position

      const greenSphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 0.25 }, scene)
      greenSphere.material = greenMat
      greenSphere.position = lightGreen.position

      const blueSphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 0.25 }, scene)
      blueSphere.material = blueMat
      blueSphere.position = lightBlue.position

      const whiteSphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 0.25 }, scene)
      whiteSphere.material = whiteMat
      whiteSphere.position = lightWhite.position

      const groundMat = new BABYLON.StandardMaterial('groundMat', scene)
      groundMat.diffuseColor = mats[0]
      groundMat.emissiveColor = new Color3(0.3, 0.3, 0.3)
      const ground = BABYLON.MeshBuilder.CreateGround('ground',
        {
          width: 6,
          height: 6
        },
        scene
      )
      ground.material = groundMat


      const makeYellow = function() {
        groundMat.diffuseColor = mats[0]
      }
      const makePurple = function() {
        groundMat.diffuseColor = mats[1]
      }
      const makeCyan = function () {
        groundMat.diffuseColor = mats[2]
      }
      const makeWhite = function () {
        groundMat.diffuseColor = mats[3]
      }
      console.log('GUI', BABYLON)
      const matGroup = new GUI.RadioGroup('Material Color', 'radio')
      matGroup.addRadio('Yellow', makeYellow, true)
      matGroup.addRadio('Purple', makePurple)
      matGroup.addRadio('Cyan', makeCyan)
      matGroup.addRadio('White', makeWhite)

      const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI')
      const selectBox = new GUI.SelectionPanel('sp', [matGroup])
      selectBox.width = 0.25
      selectBox.height = '50%'
      selectBox.top = '4px'
      selectBox.left = '4px'
      selectBox.background = 'white'
      selectBox.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
      selectBox.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP

      advancedTexture.addControl(selectBox)

      return scene
    },
    // 生成图片纹理
    createTexture(canvas) {
      const { Vector3, Color3 } = BABYLON
      const scene = new BABYLON.Scene(this.engine)

      const camera = new BABYLON.ArcRotateCamera('camera',
        -Math.PI / 2,
        Math.PI / 4,
        5,
        BABYLON.Vector3.Zero(),
        scene
      )
      camera.attachControl(canvas, true)

      const light = new BABYLON.HemisphericLight('hemilight',
        new Vector3(-1, 1, 0),
        scene
      )
      light.diffuse = new Color3(1, 0, 0)
      light.specular = new Color3(0, 1, 0)
      light.groundColor = new Color3(0, 1, 0)

      const grass0 = new BABYLON.StandardMaterial('grass0', scene)
      grass0.diffuseTexture = new BABYLON.Texture('/src/babylon001.jpg', scene)
      grass0.alpha = 0.5

      const grass1 = new BABYLON.StandardMaterial('grass1', scene)
      grass1.emissiveTexture = new BABYLON.Texture('/src/babylon002.jpg', scene)

      const grass2 = new BABYLON.StandardMaterial('grass2', scene)
      grass2.ambientTexture = new BABYLON.Texture('/src/babylon001.jpg', scene)
      grass2.diffuseColor = new Color3(1, 0, 0)

      const sphere0 = BABYLON.MeshBuilder.CreateSphere('sphere0', {}, scene)
      sphere0.position.x = -1.5
      sphere0.material = grass0

      const sphere1 = BABYLON.MeshBuilder.CreateSphere('sphere1', scene)
      sphere1.material = grass1

      const sphere2 = BABYLON.MeshBuilder.CreateSphere('sphere2', scene)
      sphere2.material = grass2
      sphere2.position.x = 1.5

      return scene
    },

  }
}
</script>

<style scoped>

</style>