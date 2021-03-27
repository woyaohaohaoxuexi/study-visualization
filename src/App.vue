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
import EchartsLing from '@/components/echarts/EchartsLing';
import CanvasRotate from "@/components/canvas/CanvasRotate";
import GlOne from '@/components/webgl/GlOne'
import GlTwo from "@/components/webgl/GlTwo";
import GlThree from "@/components/webgl/GlThree";
import GlFour from "@/components/webgl/GlFour";
import GlFive from '@/components/webgl/GlFive'
import GLSix from "./components/webgl/GLSix";
import WordCloud from "@/components/3D/WordCloud";
import Swiper from '@/components/swiper/index'
import EchartsPie from "./components/echarts/EchartsPie";
import EchaertsSurface from "./components/echarts/EchaertsSurface";
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
    EchartsLing,
    EchartsPie,
    EchaertsSurface,
    CanvasRotate,
    GlOne,
    GlTwo,
    GlThree,
    GlFour,
    GlFive,
    GLSix,
    WordCloud,
    Swiper
  },
  data() {
    return {
      currentComponent: 'GLSix'
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
{
"log": {
"error": "",
"loglevel": "info",
"access": ""
},
"inbounds": [
{
"listen": "127.0.0.1",
"protocol": "socks",
"settings": {
"udp": true,
"auth": "noauth"
},
"port": "10808"
},
{
"listen": "127.0.0.1",
"protocol": "http",
"settings": {
"timeout": 360
},
"port": "10807"
}
],
"outbounds": [
{
"mux": {
"enabled": false,
"concurrency": 8
},
"protocol": "vmess",
"streamSettings": {
"wsSettings": {
"path": "/ray",
"headers": {
"host": "lonelyd.tk"
}
},
"tlsSettings": {
"allowInsecure": true
},
"security": "tls",
"network": "ws"
},
"tag": "proxy",
"settings": {
"vnext": [
{
"address": "lonelyd.tk",
"users": [
{
"id": "423e8872-fa58-11e9-9781-56000263c7ba",
"alterId": 64,
"level": 0,
"security": "aes-128-gcm"
}
],
"port": 443
}
]
}
},
{
"tag": "direct",
"protocol": "freedom",
"settings": {
"domainStrategy": "AsIs",
"redirect": "",
"userLevel": 0
}
},
{
"tag": "block",
"protocol": "blackhole",
"settings": {
"response": {
"type": "none"
}
}
}
],
"dns": {},
"routing": {
"settings": {
"domainStrategy": "AsIs",
"rules": []
}
},
"transport": {}
}
