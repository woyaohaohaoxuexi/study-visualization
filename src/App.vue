<template>
  <div id="app">
    <LearnCanvas />
  </div>
</template>

<script>
import LearnCanvas from './components/LearnCanvas'

export default {
  name: 'App',
  components: {
    LearnCanvas
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
  margin-top: 60px;
}
</style>
