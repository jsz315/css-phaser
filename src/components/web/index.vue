<template>
  <div class="web-view" v-if="visible">
    <div class="box">
      <div class="btns">
        <div class="btn" :class="{selected: cur=='style'}" @click="onChange('style')">样式</div>
        <div class="btn" :class="{selected: cur=='html'}" @click="onChange('html')">结构</div>
        <div class="space"></div>
        <div class="btn" @click="onHide">关闭</div>
      </div>
      <textarea class="content" v-bind:value="content[cur]"></textarea>
    </div>
      
  </div>
</template>

<script>

import game from '../../js/App.ts'
import Tooler from '../../js/tooler'

export default {
  data(){
    return {
      visible: false,
      content: {html: '', style: ''},
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
      console.log(content);
      this.visible = true;
      // this.content = content;
      var style = [];
      var html = [];
      content.forEach(item=>{
        style.push(Tooler.getStyle(item));
        html.push(Tooler.getHtml(item));
      })
      this.content.style = Tooler.warpStyle(style.join("\n\r"));
      this.content.html = Tooler.warpHtml(html.join("\n\r"));
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