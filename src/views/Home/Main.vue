<template>
    <!-- form标签和不为空的action属性是为了在ios上正常显示小键盘搜索按钮 -->
    <form action="-">
        <Search v-model="searchText" show-action background="#ffffe0" placeholder="请输入搜索关键词" @search="onSearch" />        
    </form>
    <Grid :column-num="2">
        <GridItem v-for="item in items" :to="{name: 'Detail', params: {id: item.id}}">
            <template #icon>
                <Image :src="item.img" />
            </template>
            <template #text>
                <span class="text">{{ item.text }}</span>
            </template>
        </GridItem>
    </Grid>
</template>

<script lang="ts" setup>
import { Search, Grid, GridItem, Image } from 'vant';
import { ref } from 'vue';

const searchText = ref()

const onSearch = () => {
    console.log(searchText.value)
}

const items = ref([{
    text: "iPad99新",
    img: "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
    id: 1
}])

</script>

<style scoped>
.text {
    font-size: larger;
    font-weight: bolder;
}
</style>