<template>
    <div class="main">
        <div class="text">
            请登录或注册后再使用
        </div>
        <div class="buttons">
            <Button color="linear-gradient(to left, #FA340F, #F07416)" size="large" class="button" round :to="{name: 'Register'}">注册</Button>
            <Button color="linear-gradient(to left, #FA340F, #F07416)" size="large" class="button" round :to="{name: 'Login'}">登录</Button>
            <Button color="linear-gradient(to left, #FA340F, #F07416)" size="large" class="button" round :to="{name: 'Main'}">直接进入主页</Button>            
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Button, Space, Row, Col } from 'vant';
import { useWindowSize } from '@vant/use';
import { computed } from '@vue/reactivity';

const { width, height } = useWindowSize()
const mainHeight = computed(() => `${height.value}px`)
const textPaddingTop = computed(() => `${height.value / 3.2}px`)
const textPaddingBottom = computed(() => `${height.value / 18}px`)


</script>

<style scoped>
.main {
    background-color: lightyellow;
    height: v-bind(mainHeight);
}

.text {
    font-size: 1.8em;
    text-align: center;
    padding-top: v-bind(textPaddingTop);
    padding-bottom: v-bind(textPaddingBottom);
}
.buttons {
    width: 90%;
    margin-left: 5%;
}
.button {
    margin-top: 25px;
}
</style>