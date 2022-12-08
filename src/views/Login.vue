<template>
    <Sticky>
        <NavBar title="用户登录" />
    </Sticky>
    <Tabs v-model:active="active">
        <Tab title="密码登录">
            <div class="form-block">
                <Form @submit="onSubmit">
                    <Field v-model="form1.name" name="name" label="姓名" placeholder="姓名"
                        :rules="[{ required: true, message: '请填写姓名' }]" />
                    <Field v-model="form1.sno" name="sno" label="学号" placeholder="学号" type="digit"
                        :rules="[{ required: true, message: '请填写学号' }]" />
                    <Field v-model="form1.password" name="password" label="密码" placeholder="密码" type="password"
                        :rules="[{ required: true, message: '请输入密码' }]" />
                    <div class="center-text">还没有账号?现在去<RouterLink :to="{ name: 'Register' }"><span
                                class="link-text">注册</span></RouterLink>
                    </div>
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
import { Tabs, Tab, Form, Field, Button, NavBar, Sticky } from 'vant';
import { computed, ref } from 'vue';

const active = ref(0)

const onSubmit = () => {

}

const form1 = ref({
    name: '',
    sno: '',
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