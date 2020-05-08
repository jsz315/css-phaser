<template>
  <div id="app">
    <Stage/>
  </div>
</template>

<script>
import Stage from './components/stage/index.vue'

export default {
  name: 'App',
  components: {
    Stage
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
}
html,body{
  margin: 0;
  padding: 0;
  font-size: 12px;
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  overflow: hidden;
}
</style>
