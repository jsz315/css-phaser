<template>
  <div class="web-view" v-if="visible">
    <div class="box">
      <div class="btns">
        <div class="btn" @click="onChange('style')">样式</div>
        <div class="btn" @click="onChange('html')">结构</div>
        <div class="space"></div>
        <div class="btn" @click="onHide">关闭</div>
      </div>
      <textarea class="content" v-bind:value="content[cur]"></textarea>
    </div>
      
  </div>
</template>

<script>

import game from '../../js/App.ts'

export default {
  data(){
    return {
      visible: false,
      content: {html: 'dfdf', style: 'ggg'},
      cur: 'html'
    }
  },
  props: {
    msg: String
  },
  components: {
    
  },
  mounted(){
    
  },
  methods: {
    publish(content){
      this.visible = true;
      // this.content = content;
    },
    onHide(){
      this.visible = false;
    },
    onChange(index){
      this.cur = index;

    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "./index.less";
</style>

