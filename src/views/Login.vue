<template>
    <Sticky>
        <NavBar title="用户登录" />
    </Sticky>
    <Tabs v-model:active="active">
        <Tab title="密码登录">
            <div class="form-block">
                <Form @submit="onSubmit">
                    <Field v-model="form1.userId" name="userId" label="学号" placeholder="学号" type="digit" :rules="[{required: true, message: '请填写学号'}]" />
                    <Field v-model="form1.password" name="password" label="密码" placeholder="密码" type="password" :rules="[{required: true, message: '请输入密码'}]" />
                    <div class="center-text">还没有账号?现在去<RouterLink :to="{name: 'Register'}"><span class="link-text">注册</span></RouterLink></div>
                    <Button round block type="primary" native-type="submit">提交</Button>
                </Form>
            </div>
        </Tab>
        <Tab class="face_login" title="人脸登录">
            <FaceDetect type="login" />
        </Tab>
    </Tabs>
</template>

<script lang="ts" setup>
import FaceDetect from '@/components/FaceDetect.vue';
import { useWindowSize } from '@vant/use';
import { Tabs, Tab, Form, Field, Button, NavBar, Sticky, showToast, showFailToast } from 'vant';
import { computed, ref } from 'vue';
import { login } from '@/utils/api';
import { useUserStore } from '@/utils/pinia'
import { useRouter } from 'vue-router';

const active = ref(0)

const userStore = useUserStore()
const router = useRouter()

const onSubmit = () => {
    login(form1.value.userId, form1.value.password)
    .then((res) => {
        //console.log('1) res is', res)
        if(!res || res.data.code != 204) throw new Error("登录失败")
        //console.log('2) prepare to set state')
        userStore.login(res.data.result[0].userId, res.data.result[0].userName)
        //console.log('3) state is set', userStore)
        showToast(res.data.message)
    })
    .then(() => {
        //console.log('4) prepare to jump')
        router.push({name: 'Main'})
        //console.log('5) page jumped')
    })
    .catch((err: Error) => {
        //console.error(err)
        showFailToast(err.message)
    })
}

const form1 = ref({
    userId: '',
    password: ''
})

const { width, height } = useWindowSize()
const formBlockMarginTop = computed(() => `${height.value / 20}px`)

</script>

<style scoped>
.form-block {
    margin-top: v-bind(formBlockMarginTop);
    padding-left: 5%;
    padding-right: 5%;
}

.link-text {
    color: blue;
}

.center-text {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 15px;
}

.face_login {
    padding-top: 15px;
}

Form>* {
    margin-top: 10px;
}
</style>