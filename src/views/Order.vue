<template>
    <Card :num="1" :title="product.name" :desc="product.desc" :price="(product.price/100).toFixed(2)" :thumb="pics[0]" />
    <CellGroup title="订单详情">
        <Cell title="订单生成时间" :value="order.time" />
        <Cell title="订单状态" :value="statusText" />
        <Cell title="交易方式" :value="product.methods" />
        <Cell title="校区" :value="product.region" />
    </CellGroup>

    <ActionBar v-if="order.status === 0">
        <ActionBarButton type="danger" text="确认收货" @click="onConfirm" />
    </ActionBar>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { getGoodsByUUID, returnDealDetail, updateDealStatus1 } from '@/utils/api';
import { Card, showFailToast, CellGroup, Cell, ActionBar, ActionBarButton, showToast } from 'vant';
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()

const product = ref({
    name: 'iPad',
    region: '朝晖校区',
    methods: '快递/面交',
    tag: '苹果',
    desc: '',
    addTime: '',
    price: 0,

})

const order = ref({
    time: '',
    status: 0
})

const pics = ref<string[]>([])

onMounted(() => {
    let id:string = typeof route.params['id'] === 'string' ? route.params['id'] : route.params['id'][0]
    returnDealDetail(id)
    .then((res) => {
        if(!res || res.data.code != 222) throw new Error("获取商品详情失败")
        product.value.name = res.data.result[1].cName
        product.value.region = res.data.result[1].place
        product.value.methods = res.data.result[1].way
        product.value.tag = res.data.result[1].type
        product.value.desc = res.data.result[1].detail
        product.value.addTime = res.data.result[1].addTime
        product.value.price = res.data.result[1].price
        res.data.result[1].pictureList.forEach((element: {picture: string}) => {
            pics.value.push(element.picture)
        })
        order.value.status = res.data.result[0].status
        order.value.time = res.data.result[0].time
    })
    .catch((err: Error) => {
        showFailToast(err.message)
    })
})

const statusText = computed(() => {
    switch (order.value.status) {
        case 0:
            return "进行中"
        case 1:
            return "已收货"
        case 2:
            return "已退货"    
        default:
            showFailToast("未知的订单状态")
            return "Error"
    }
})

// 确认收货
const onConfirm = () => {
    let id:string = typeof route.params['id'] === 'string' ? route.params['id'] :route.params['id'][0]
    updateDealStatus1(id)
    .then((res) => {
        if(!res || res.data.code != 223) throw new Error("确认收货失败")
        showToast("确认收货成功")
        router.push({name: 'Home'})
    })
    .catch((err: Error) => {
        showFailToast(err.message)
    })
}
</script>