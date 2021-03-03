<template>
  <div id="app">
    <components :is="currentComponent"></components>
  </div>
</template>

<script>
// import LearnCanvas from './components/LearnCanvas'
// import GobangGame from './components/GobangGame'
// import LearnWebGL from "@/components/LearnWebGL";
// import LearnCanvas from './components/LearnCanvas'
// import Translate from './components/canvas/translate'
// import VectorTree from './components/canvas/meishu'
// import VectorShape from './components/canvas/shape'
// import VectorYuan from './components/canvas/yuan'
// import VectorParametric from './components/canvas/parametric'
// import VectorDuobian from './components/canvas/duobian'
// import VectorTrianglePolygon from './components/canvas/triangle-polygon'
// import VectorPolygon2d from './components/canvas/polygon2d'
// import VectorXiangsu from './components/canvas/xiangsu04'
// import WebglOne from './components/webgl/gl01'
// import WebglTwo from './components/webgl/gl02'
// import WebglThree from './components/webgl/gl03'
// import BabylonGl from "@/components/babylon/BabylonGl";
import BabylonXiantiao from "@/components/babylon/BabylonXiantiao";
import BabylonMaterial from "@/components/babylon/BabylonMaterial";
import BabylonModule from "@/components/babylon/BabylonModule";
import EchartsOne from "@/components/echarts/EchartsOne";
import EchartsGl from "@/components/echarts/EchartsGl";
import EchartsMap from "@/components/echarts/EchartsMap";
import EchartsMap2 from "@/components/echarts/EchartsMap2";
import CanvasRotate from "@/components/canvas/CanvasRotate";
export default {
  name: 'App',
  components: {
    // LearnCanvas,
    // LearnWebGL,
    // GobangGame
    // Translate,
    // VectorTree,
    // VectorShape,
    // VectorYuan,
    // VectorParametric
    // VectorDuobian,
    // VectorTrianglePolygon,
    // VectorPolygon2d,
    // WebglOne,
    // WebglTwo,
    // WebglThree,
    // VectorXiangsu,
    // BabylonGl,
    BabylonXiantiao,
    BabylonMaterial,
    BabylonModule,
    EchartsOne,
    EchartsGl,
    EchartsMap,
    EchartsMap2,
    CanvasRotate
  },
  data() {
    return {
      currentComponent: 'EchartsMap2'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
