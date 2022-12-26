<template>
    <Card :num="1" :title="product.name" :desc="product.desc" :price="(product.price/100).toFixed(2)" :thumb="pics[0]" />
    <Field 
        v-model="method" 
        is-link 
        readonly 
        label="交易方式"
        @click="showMethodPicker = true"
        />
    <!-- 商品信息 -->
    <!-- 交易方式 -->
        <!-- 面交(手动填写) -->
            <!-- 时间 -->
            <!-- 地点 -->
        <!-- 快递(自动获取) -->
            <!-- 收货地址 -->
    <Field 
        v-model="handDeliverOptions.place"
        label="交易地点"
        />
    <Field 
        v-model="handDeliverOptions.date" 
        label="交易日期" 
        is-link
        readonly
        @click="showDatePicker = true"
        />
    <SubmitBar :price="product.price" @submit="onSubmit" button-text="确认购买" :tip="tip" tip-icon="info-o" :disabled="disabled" />

    <Popup v-model:show="showMethodPicker" round position="bottom">
        <Picker :columns="columns" @cancel="showMethodPicker = false" @confirm="onMethodConfirm" /> 
    </Popup>
    <Popup v-model:show="showDatePicker" round position="bottom">
        <DatePicker v-model="date" :min-date="new Date()" @cancel="showDatePicker = false" @confirm="onDateConfirm"/>
    </Popup>
</template>    

<script lang="ts" setup>
import { getGoodsByUUID, insertToCar } from '@/utils/api';
import { useUserStore } from '@/utils/pinia';
import { showToast, SubmitBar, Field, Popup, Picker, Card, showFailToast, DatePicker } from 'vant';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

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

const pics = ref<string[]>([])

const method = ref()    // 当前选中的交易方式
const disabled = ref(true) // 是否允许下单
const showMethodPicker = ref(false)   // 是否展示交易方式选择器
const showDatePicker = ref(false) // 是否展示交易日期选择器
const tip = ref("")

const handDeliverOptions = ref({
    date: '',
    place: ''
})

const date = ref([new Date().getFullYear().toString(), new Date().getMonth().toString(), new Date().getDate().toString()])

onMounted(() => {
    let id:string = typeof route.params['id'] === 'string' ? route.params['id'] : route.params['id'][0]
    getGoodsByUUID(id)
    .then((res) => {
        if(!res || res.data.code != 206) throw new Error("获取商品详情失败")
        product.value.name = res.data.data.cName
        product.value.region = res.data.data.place
        product.value.methods = res.data.data.way
        product.value.tag = res.data.data.type
        product.value.desc = res.data.data.detail
        product.value.addTime = res.data.data.addTime
        product.value.price = res.data.data.price
        res.data.data.pictureList.forEach((element: {picture: string}) => {
            pics.value.push(element.picture)
        })
    })
    .then(() => {
        disabled.value = false
    })
    .catch((err: Error) => {
        showFailToast(err.message)
    })
    method.value = product.value.methods.split('/')[0]
})

const columns = computed(() => {
    let raw = product.value.methods.split('/')
    let cols: { text: string; value: string; }[] = []
    raw.forEach((element) => cols.push({text: element, value: element}))
    return cols;
})

// 确认购买
const onSubmit = () => {
    let id:string = typeof route.params['id'] === 'string' ? route.params['id'] : route.params['id'][0]
    insertToCar(id, useUserStore().userId)
    .then((res) => {
        if(!res || res.data.code != 224) throw new Error("购买失败")
        router.push({name: 'Order', params: { id: res.data.result[0].id }})
    })
    .catch((err: Error) => {
        showFailToast(err.message)
    })
}

// 提交当前订单信息给后端，验证是否合法，返回验证结果，tip内容等
const check = () => {

}
// 确认修改交易方式后
const onMethodConfirm = ( selected: any ) => {
    showMethodPicker.value = false
    method.value = selected.selectedOptions[0].text
}

const onDateConfirm = ( selected: any ) => {
    showDatePicker.value = false
    handDeliverOptions.value.date = selected.selectedValues.join('-')
}
</script>

<style scoped>

</style>