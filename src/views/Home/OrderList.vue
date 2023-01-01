<template>
    <Sticky><NavBar title="订单" /></Sticky>
    <Tabs v-model:active="active">
        <Tab title="购买">
            <OrderBuy />
        </Tab>
        <Tab title="出售">
            <OrderSell />
        </Tab>
    </Tabs>
</template>

<script lang="ts" setup>
import { NavBar, Sticky, Tab, Tabs } from 'vant';
import { ref } from 'vue';
import OrderBuy from '../../components/OrderBuy.vue';
import OrderSell from '../../components/OrderSell.vue';

const active = ref(0)

</script>