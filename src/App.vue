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

<style lang="less">
@import "./index.less";
</style>
