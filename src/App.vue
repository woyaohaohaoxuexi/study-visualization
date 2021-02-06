<template>
  <div id="app">
<!--    <LearnCanvas />-->
    <LearnWebGL />
<!--    <GobangGame />-->
  </div>
</template>

<script>
import LearnCanvas from './components/LearnCanvas'
// import GobangGame from './components/GobangGame'
import LearnWebGL from "@/components/LearnWebGL";
export default {
  name: 'App',
  components: {
    // LearnCanvas,
    LearnWebGL,
    // GobangGame
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
