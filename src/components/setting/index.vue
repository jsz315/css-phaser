<template>
    <div class="setting-view">
        <div class="title">素材属性</div>
        <div class="attrs">
            <Attr label="宽度" attr="width" :num="view.width"  @change="onViewChange" />
            <Attr label="高度" attr="height" :num="view.height"  @change="onViewChange" />
            <Attr label="坐标x" attr="x" :num="view.x"  @change="onViewChange" />
            <Attr label="坐标y" attr="y" :num="view.y"  @change="onViewChange" />
            <Attr label="可拖动" attr="enabled" :num="view.enabled" type="checkbox" @change="onViewChange" />
            <Attr label="等比" attr="ratio" :num="view.ratio" type="checkbox" @change="onViewChange" />
            <Attr label="颜色" attr="color" v-if="display.color" :num="view.color" type="color" @change="onViewChange" />
            <Attr label="文本" attr="word" v-if="display.word" :num="view.word" type="text" @change="onViewChange" />
            <Attr label="字号" attr="size" v-if="display.size" :num="view.size" @change="onViewChange" />
            <div class="btn" @click="onDelete">删除物体</div>
        </div>
        <div class="title">场景属性</div>
        <div class="attrs">
            <Attr label="宽度" attr="width" :num="stage.width"  @change="onStageChange" />
            <Attr label="高度" attr="height" :num="stage.height"  @change="onStageChange" />
            <Attr label="颜色" attr="color" :num="stage.color" type="color"  @change="onStageChange" />
            <div class="btn" @click="onPulish">导出内容</div>
        </div>
    </div>
</template>
<script>
import listener from "../../js/listener";
import Tooler from "../../js/tooler";
import {mapState, mapMutations} from 'vuex';
import Attr from '../attr/index.vue'

export default {
    data() {
        return {
            view: {
                id: "",
                width: 0,
                height: 0,
                x: 0,
                y: 0,
                enabled: true,
                ratio: true,
                color: "#ff0000",
                word: "",
                size: 24
            },
            display: {
              color: false,
              word: false,
              size: false
            },
            stage: {
                width: 750,
                height: 600,
                color: "#ff0000"
            }
        };
    },
    components: {
        Attr
    },
    methods: {
        ...mapMutations(['changeVersion', 'changeAssets']),
        onViewChange(attr, num){
            console.log(attr, num);
            switch(attr){
                case 'width':
                    this.view.width = num;
                    break;
                case 'height':
                    this.view.height = num;
                    break;
                case 'x':
                    this.view.x = num;
                    break;
                case 'y':
                    this.view.y = num;
                    break;
                case 'enabled':
                    this.view.enabled = num;
                    break;
                case 'ratio':
                    this.view.ratio = num;
                    break;
                case 'color':
                    this.view.color = num;
                    break;
                case 'size':
                    this.view.size = num;
                    break;
                case 'word':
                    this.view.word = num;
                    break;

            }
            listener.emit("attr_view", attr, num);
        },
        onStageChange(attr, num){
            console.log(attr, num);
            switch(attr){
                case 'width':
                    this.stage.width = num;
                    break;
                case 'height':
                    this.stage.height = num;
                    break;
                case 'color':
                    this.stage.color = num;
                    break;
            }
            listener.emit("attr_stage", attr, num);
        },
        onDelete(){
          listener.emit("delete", this.view.id);
        },
        onPulish(){
          listener.emit("publish");
        }
    },
    mounted(){
        listener.on("view", (view) => {
            this.view.width = view.width * view.scaleX;
            this.view.height = view.height * view.scaleY;
            this.view.x = view.x;
            this.view.y = view.y;
            this.view.enabled = Number(view.input.enabled);
            this.view.ratio = view.getData('ratio');
            this.view.id = view.name;

            var color = view.getData('color');
            if(color != undefined){
                this.view.color = Tooler.toColorString(color);
                this.display.color = true;
            }
            else{
              this.view.color = color;
              this.display.color = false;
            }

            var word = view.getData('word');
            if(word != undefined){
                this.view.word = word;
                this.display.word = true;
            }
            else{
              this.view.word = word;
              this.display.word = false;
            }

            var size = view.getData('size');
            if(size != undefined){
                this.view.size = size;
                this.display.size = true;
            }
            else{
              this.view.size = size;
              this.display.size = false;
            }
        });
    },
    computed:{
        ...mapState(['version', 'assets']),
    },
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>