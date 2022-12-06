<template>
    <Sticky>
        <NavBar title="用户注册" />
    </Sticky>
    <div class="form-block">
        <Form @submit="onSubmit" label-width="7.2em">
            <Field v-model="form.name" name="name" label="姓名" placeholder="请上传学生证，该字段自动识别" required readonly />
            <Field v-model="form.sno" name="sno" label="学号" placeholder="请上传学生证，该字段自动识别" required readonly />
            <Field name="pic" label="学生证照片(不得超过1MB)">
                <template #input>
                    <Uploader :max-size="(1024 * 1024)" :max-count="1" v-model="picList" :after-read="doUpload"
                        @oversize="onOversize" />
                </template>
            </Field>
            <Field v-model="form.telephone" name="telephone" label="手机" placeholder="请输入手机号" type="tel" required
                :rules="[{ pattern: telephonePattern, message: '请输入正确的手机号' }]" />
            <Field v-model="form.code" name="code" label="验证码" placeholder="请输入验证码" required>
                <template #button>
                    <Button type="primary" @click="getCode" size="small" :disabled="(codeDelay > 0)" >{{codeDelay > 0 ? `${codeDelay}秒后重试` : '获取验证码'}}</Button>
                </template>
            </Field>
            <Field v-model="form.password" name="password" label="密码" placeholder="请输入密码" type="password" required
                :rules="[{ pattern: passwordPattern, message: '密码8到16位，至少包含一个大写字母和一个小写字母!' }]" />
            <Field v-model="form.passwordTwice" name="passwordTwice" label="再次输入密码" placeholder="请再次输入密码"
                type="password" required :rules="[{ validator: validatePasswordTwice, message: '两次密码不一致' }]" />
            <Field name="face" label="人脸照片(不得超过2MB)" required>
                <template #input>
                    <Uploader :max-size="(2048 * 1024)" :max-count="1" v-model="faceList" @oversize="onOversize" />
                </template>
            </Field>
            <Button native-type="submit" type="primary" round block>注册</Button>
        </Form>
    </div>
</template>

<script lang="ts" setup>
import { useWindowSize } from '@vant/use';
import { Form, Field, Button, NavBar, Sticky, Uploader, showToast, type UploaderFileListItem } from 'vant';
import { computed, ref, watchEffect } from 'vue';

const form = ref({
    name: '',
    sno: '',
    telephone: '',
    code: '',
    password: '',
    passwordTwice: ''
})

const picList = ref<UploaderFileListItem[]>([])
const faceList = ref<UploaderFileListItem[]>([])

const telephonePattern = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9~!@&%#_]{8,16}$/

const codeDelay = ref(0)

const onSubmit = () => {
    // 提交表单
}

const doUpload = (file: any) => {
    picList.value[0].status = 'uploading'
    picList.value[0].message = "上传中"

    // 上传图片文件到服务器
    let success = true
    if (success) {
        picList.value[0].status = 'done'
        picList.value[0].message = ""
    } else {
        picList.value[0].status = 'failed'
        picList.value[0].message = "上传失败"
    }

    console.log(file)
}

const onOversize = (file: object) => {
    showToast("文件大小超过规定")
}

const getCode = () => {
    if (!form.value.telephone.match(telephonePattern)) {
        showToast("请输入正确的手机号")
        return
    }
    codeDelay.value = 60

    // 获取验证码
}

watchEffect(() => {
    if(codeDelay.value > 0)
        setTimeout(() => codeDelay.value--, 1000)
})

const validatePasswordTwice = (value: string) => {
    return value === form.value.password
}

const { width, height } = useWindowSize()
const formBlockMarginTop = computed(() => `${height.value / 20}px`)
</script>

<style scoped>
.form-block {
    margin-top: 5px;
    padding-left: 5%;
    padding-right: 5%;
}

Form>* {
    margin-top: 10px;
}
</style>