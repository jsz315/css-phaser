<template>
  <div class="stage">
      <canvas class="canvas" ref="canvas"></canvas>
      <File ref="file"/>
      <Setting ref="setting"/>
  </div>
</template>

<script>

import game from '../../js/App.ts'
import File from '../file/index.vue'
import Setting from '../setting/index.vue'
export default {
  name: 'stage',
  props: {
    msg: String
  },
  components: {
    File, Setting
  },
  mounted(){
    console.log(this.$refs.canvas);
    var canvas = this.$refs.canvas;
    // canvas.width = 750;
    // canvas.height = window.innerHeight - 40;
    game.init(canvas);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "./index.less";
</style>

