<template>
    <RouterView></RouterView>
    <Tabbar v-model="active" route>
        <TabbarItem name="main" :to="{name: 'Main'}" replace>
            <template #icon="props">
                <Home />
            </template>
        </TabbarItem>

        <TabbarItem name="order" :to="{name: 'Order'}" replace>
            <template #icon="props">
                <Order />
            </template>
        </TabbarItem>

        <TabbarItem name="message" :to="{name: 'Message'}" replace>
            <template #icon="props">
                <Message />
            </template>
        </TabbarItem>

        <TabbarItem name="profile" :to="{name: 'Profile'}" replace>
            <template #icon="props">
                <User />
            </template>
        </TabbarItem>
    </Tabbar>
</template>

<script lang="ts" setup>
import { Tabbar, TabbarItem } from 'vant';
import { ref } from 'vue';
import { Home, Message, Order, User } from '@icon-park/vue-next';


const active = ref('main')

</script>