<template>
    <Sticky><NavBar title="订单" /></Sticky>
    <PullRefresh v-model="refreshing" @refresh="onRefresh">
        <List v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <Card v-for="item in list" :title="item.name" :num="item.count" :price="item.price.toFixed(2)"
                :thumb="item.pic" :desc="item.desc" :tag="getTag(item.status)">
                <template #footer>
                    <span class="time">{{ getDate(item.timestamp) }}</span>
                </template>
            </Card>
        </List>
    </PullRefresh>
    <BackTop bottom="100px" />
</template>

<script lang="ts" setup>
import { NavBar, List, PullRefresh, Card, Sticky, BackTop } from 'vant';
import { ref } from 'vue';

const list = ref<{
    timestamp: number,
    name: string,
    pic: string,
    price: number,
    count: number,
    desc: string,
    status: number
    /** 
     * status
     * 0 未付款
     * 1 未发货
     * 2 已发货/面交卖家已给出商品
     * 3 交易成功/面交买家以确认收到
     * 4 已评价
     */
}[]>([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const onLoad = () => {
    setTimeout(() => {
        if (refreshing.value) {
            list.value = [];
            refreshing.value = false;
        }

        for (let i = 0; i < 10; i++) {
            list.value.push({
                timestamp: new Date().getTime(),
                name: 'iPad',
                pic: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg',
                price: 3699,
                count: 3,
                desc: '正版iPad 99新',
                status: 1
            });
        }
        loading.value = false;

        if (list.value.length >= 40) {
            finished.value = true;
        }
    }, 1000);
};

const onRefresh = () => {
    // 清空列表数据
    finished.value = false;

    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    loading.value = true;
    onLoad();
};

const getDate = (timestamp: number) => {
    let date = new Date(timestamp)
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
}

const getTag = (status: number) => {
    const tag = ["未付款", "未发货", "已发货", "交易成功", "已评价"]
    return tag[status]
}
</script>