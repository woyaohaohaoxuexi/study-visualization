<template>
  <div id="app">
<!--    <LearnCanvas />-->
<!--    <LearnWebGL />-->
<!--    <GobangGame />-->
    <!-- <LearnCanvas /> -->
    <!-- <Translate /> -->
    <!-- <VectorTree /> -->
    <!-- <VectorShape /> -->
<!--    <VectorYuan></VectorYuan>-->
<!--    <VectorParametric />-->
<!--    <VectorDuobian />-->
<!--    <VectorTrianglePolygon />-->
<!--    <VectorPolygon2d />-->
<!--    <WebglOne />-->
    <WebglTwo />
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
import VectorParametric from './components/canvas/parametric'
// import VectorDuobian from './components/canvas/duobian'
// import VectorTrianglePolygon from './components/canvas/triangle-polygon'
// import VectorPolygon2d from './components/canvas/polygon2d'
// import WebglOne from './components/webgl/gl01'
import WebglTwo from './components/webgl/gl02'
export default {
  name: 'App',
  components: {
    // LearnCanvas,
    // LearnWebGL,
    // GobangGame
    // Translate,
    // VectorTree,
    // VectorShape,
    // VectorYuan
    // VectorParametric
    // VectorDuobian,
    // VectorTrianglePolygon,
    // VectorPolygon2d,
    // WebglOne,
    WebglTwo
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
