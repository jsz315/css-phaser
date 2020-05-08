<template>
    <div class="file">
        <input type="file" @change="onchange"/>
    </div>
</template>
<script>
import fileTooler from "../../js/fileTooler";
import listener from "../../js/listener";
export default {
    methods: {
        async onchange(e) {
            console.log(e.target.files[0]);
            var file = e.target.files[0];
            if(file){
                var res = await fileTooler.file2Base64(file);
                listener.emit('file', res);
            }
        },
    },
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>