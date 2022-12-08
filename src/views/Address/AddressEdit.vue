<template>
    <Sticky>
        <NavBar title="地址编辑" />
    </Sticky>
    <AddressEdit show-delete show-set-default :show-area="false" :address-info="addressInfo" @save="onSave"
        @delete="onDelete">
        <template #default>
            <Field v-model="area" is-link readonly label="所属校区" placeholder="选择校区" @click="showPicker = true" />
            <Popup v-model:show="showPicker" round position="bottom">
                <Picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
            </Popup>
        </template>
    </AddressEdit>
</template>

<script lang="ts" setup>
import { AddressEdit, showToast, type AddressEditInfo, Popup, Field, Picker, Sticky, NavBar } from "vant";
import { ref } from "vue";

const onSave = () => showToast('save');
const onDelete = () => showToast('delete');
const showPicker = ref(false)
const columns = [
    { text: '朝晖校区', value: '朝晖校区' },
    { text: '屏峰校区', value: '屏峰校区' },
    { text: '莫干山校区', value: '莫干山校区' }
]

const onConfirm = (select: 	{ selectedValues: string }) => {
    showPicker.value = false;
    area.value = select.selectedValues
}

const addressInfo = ref<Partial<AddressEditInfo>>({
    isDefault: false,
    tel: '',
    addressDetail: '',
    name: '',
})

const area = ref('')

</script>

<style scoped>

</style>