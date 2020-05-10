<template>
    <div class="file-view">
        <Drag @drag="ondrag"/>
        <div class="btn" @click="addBlock">添加区块</div>
        <input class="input" type="file" ref="file" @change="onChange" multiple/>
        <div class="btn" @click="addImage">导入图片</div>
        <div class="list">
            <div class="item" v-for="(item, index) in assets" v-bind:key="index">
                <div class="img" :style="{'background-image': 'url(' + item.img + ')'}" @dblclick="useImage(item)"></div>
                <div class="name">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import fileTooler from "../../js/fileTooler";
import listener from "../../js/listener";
import Drag from '../drag/index.vue'
import {mapState, mapMutations} from 'vuex'
export default {
    components: {
        Drag
    },
    methods: {
        ...mapMutations(['changeVersion', 'changeAssets']),
        onChange(e) {
            console.log(e.target.files);
            var files = e.target.files;
            this.addFiles(files);
        },
        async addFiles(files){
            for(var i = 0; i < files.length; i++){
                var file = files[i];
                if(file){
                    var res = await fileTooler.file2Base64(file);
                   
                    var list = this.assets.concat({img: res, name: file.name});
                    this.changeAssets(list);
                }
            }
        },
        addImage(){
            this.$refs.file.click();
        },
        useImage(item){
            listener.emit('file', item);
        },
        addBlock(){
            listener.emit('block');
        },
        ondrag(files){
            console.log(files);
            this.addFiles(files);
        }
    },
    mounted(){
        console.log(this.version, 'version');
    },
    computed:{
        ...mapState(['version', 'assets'])
    },
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>