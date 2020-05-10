<template>
    <div class="attr-view">
        <div class="label">{{label}}</div>
        <template v-if="type == 'checkbox'">
            <div class="checkbox" :class="{'selected':num}" type="checkbox" @click="onClick"></div>
            <div class="space"></div>
        </template>
        <template v-else-if="type == 'color'">
            <input class="color" type="color" v-bind:value="num" @change="onColor">
            <div class="space"></div>
        </template>
        <template v-else-if="type == 'text'">
            <input class="text" type="text" v-bind:value="num" @change="onText">
        </template>
        <template v-else>
            <input class="text" type="text" v-bind:value="showNum" @change="onNumber">
        </template>
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
    // props: {
    //     label: String,
    //     attr: String,
    //     type: String,
    //     num: {
    //         type: Number,
    //         default: 0
    //     },
    // },
    props: ["label", "attr", "type", "num"],
    methods: {
        ...mapMutations(['changeVersion', 'changeAssets']),
        onColor(e){
            this.$emit("change", this.attr, e.target.value);
        },
        onNumber(e){
            this.$emit("change", this.attr, Number(e.target.value));
        },
        onText(e){
            this.$emit("change", this.attr, e.target.value);
        },
        onClick(e){
            console.log(this.attr, !this.num);
            this.$emit("change", this.attr, !this.num);
        }
    },
    mounted(){
        this.cur = this.num;
    },
    computed:{
        ...mapState(['version', 'assets']),
        showNum(){
            return Number(this.num).toFixed(0);
        }
    },
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>