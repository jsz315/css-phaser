<template>
    <div class="attr-view">
        <div class="label">{{label}}</div>
        <input class="value" v-bind:value="showNum" @change="onChange">
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
    data() {
        return {
            cur: 0
        };
    },
    props: {
        label: String,
        attr: String,
        num: {
            type: Number,
            default: 0
        },
    },
    methods: {
        ...mapMutations(['changeVersion', 'changeAssets']),
        onChange(e){
            console.log(e, 'e');
            this.$emit("change", this.attr, Number(e.target.value));
        }
    },
    mounted(){
        this.cur = this.num;
    },
    computed:{
        ...mapState(['version', 'assets']),
        showNum(){
            return Number(this.num).toFixed(2);
        }
    },
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>