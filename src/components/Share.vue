<template>
<ShareSheet
  v-model:show="show"
  title="立即分享给好友"
  :options="options"
  @select="onSelect"
/>
</template>

<script lang="ts" setup>
import { showToast, ShareSheet, type ToastOptions } from 'vant';
import { computed, ref } from 'vue';

const options = [
    { name: '微信', icon: 'wechat' },
    { name: '微博', icon: 'weibo' },
    { name: '复制链接', icon: 'link' },
    { name: '分享海报', icon: 'poster' },
    { name: '二维码', icon: 'qrcode' },
    { name: '投诉', icon: 'warning'}
];

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const show = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const onSelect = (option: { name: string | ToastOptions | undefined; }) => {
    showToast(option.name);
    show.value = false
};

</script>

<style scoped>

</style>