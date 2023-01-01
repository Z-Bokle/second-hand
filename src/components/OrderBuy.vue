<template>
        <PullRefresh v-model="refreshing" @refresh="onRefresh">
        <List v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <Card v-for="item in list" :title="item.name" :desc="item.desc" :price="item.price.toFixed(2)"
                :tag="getTag(item.status)" @click="router.push({name: 'Order', params:{id: item.orderId}})">
                <template #footer>
                    <span class="time">{{ item.time }}</span>
                </template>
            </Card>
        </List>
    </PullRefresh>
    <BackTop bottom="100px" />
</template>

<script lang="ts" setup>
import { dealFilter, returnDealDetail } from '@/utils/api';
import { List, PullRefresh, Card, BackTop, showFailToast } from 'vant';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const list = ref<{
    time: string,
    name: string,
    price: number,
    status: number,
    desc: string,
    orderId: string
}[]>([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const page = ref(1)

const onLoad = () => {
    setTimeout(() => {
        if (refreshing.value) {
            list.value = [];
            page.value = 1 // 重置页码
            refreshing.value = false;
        }

        dealFilter(3, page.value)
        .then((res) => {
            if(!res || res.data.code != 206) throw new Error("订单获取失败")
            res.data.result.forEach((element: { time: any; status: any; orderId: any; }) => {
                const {time, status, orderId} = element
                
                returnDealDetail(orderId)
                .then((res) => {
                    if(!res || res.data.code != 222) throw new Error("获取订单详情失败")
                    list.value.push({
                    time: time,
                    name: res.data.result[1].cname,
                    price: res.data.result[1].price,
                    status: status,
                    desc: res.data.result[1].detail,
                    orderId: orderId
                    })
                })

            })
        })
        .then(() => {
            page.value++
        })
        .catch((err: Error) => {
            showFailToast(err.message)
        })

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


const getTag = (status: number) => {
    const tag = ["未付款", "未发货", "已发货", "交易成功", "已评价"]
    return tag[status]
}
</script>