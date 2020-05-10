<template>
  <div class="stage">
      <canvas class="canvas" ref="canvas"></canvas>
      <File ref="file"/>
      <Setting ref="setting"/>
      <Web ref="web"/>
  </div>
</template>

<script>

import game from '../../js/App.ts'
import File from '../file/index.vue'
import Setting from '../setting/index.vue'
import Web from '../web/index.vue'
import listener from "../../js/listener";

export default {
  name: 'stage',
  props: {
    msg: String
  },
  components: {
    File, Setting, Web
  },
  mounted(){
    game.init(this.$refs.canvas);
    listener.on("list", list=>{
        this.$refs.web.publish(list);
    });
  },
  methods: {
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "./index.less";
</style>

