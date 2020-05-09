<template>
    <div class="file-view">
        <input class="input" type="file" ref="file" @change="onchange" multiple/>
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
import {mapState, mapMutations} from 'vuex'
export default {
    methods: {
        ...mapMutations(['changeVersion', 'changeAssets']),
        async onchange(e) {
            console.log(e.target.files[0]);
            var files = e.target.files;
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
            listener.emit('file', item.img);
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