<template>
    <!-- form标签和不为空的action属性是为了在ios上正常显示小键盘搜索按钮 -->
    <form action="-">
        <Search v-model="searchText" show-action background="#ffffe0" placeholder="请输入搜索关键词" @search="onSearch" />        
    </form>

</template>

<script lang="ts" setup>
import { Search } from 'vant';
import { ref } from 'vue';

const searchText = ref()

const onSearch = () => {
    console.log(searchText.value)
}

</script>

<style scoped>

</style>