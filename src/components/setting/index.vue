<template>
    <div class="setting-view">
        <div class="attrs">
            <Attr label="宽" attr="width" :num="view.width"  @change="onChange" />
            <Attr label="高" attr="height" :num="view.height"  @change="onChange" />
            <Attr label="左" attr="x" :num="view.x"  @change="onChange" />
            <Attr label="上" attr="y" :num="view.y"  @change="onChange" />
        </div>
    </div>
</template>
<script>
import listener from "../../js/listener";
import {mapState, mapMutations} from 'vuex'
import Attr from '../attr/index.vue'

export default {
    data() {
        return {
            view: {
                width: 0,
                height: 0,
                x: 0,
                y: 0
            }
        };
    },
    components: {
        Attr
    },
    methods: {
        ...mapMutations(['changeVersion', 'changeAssets']),
        onChange(attr, num){
            // this.$emit("change", this.attr, Number(this.showNum));
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

            }
            listener.emit("attr", attr, num);
        }
    },
    mounted(){
        listener.on("view", (view) => {
            this.view.width = view.width;
            this.view.height = view.height;
            this.view.x = view.x;
            this.view.y = view.y;
        })
    },
    computed:{
        ...mapState(['version', 'assets']),
    },
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>