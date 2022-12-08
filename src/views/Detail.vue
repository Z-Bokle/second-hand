<template>
    <Sticky>
        <NavBar title="商品详情" >
            <template #right>
                <More :size="18" @click="(showShare = true)" />
            </template>
        </NavBar>
    </Sticky>
    <div class="content">
        <div class="main">
            <Swipe lazy-render :autoplay="3000" :height="280" class="swipe" indicator-color="white">
                <SwipeItem v-for="(pic, index) in pics" :key="index">
                    <Image :src="pic" @click="showImagePreview({images: pics, startPosition: index})" />
                </SwipeItem>
            </Swipe>
            <CellGroup title="商品详情">
                <Cell title="商品名称" :value="details.name" size="large" />
                <Cell title="商品描述" :label="details.desc" size="large" />
                <Cell title="所在校区" :value="details.region" size="large" />
                <Cell title="支持交易方式" :value="details.methods" size="large" />
                <Cell title="标签" size="large" />
            </CellGroup>
            <CellGroup title="用户留言">
                <Cell v-for="comment in comments" :title="comment.name" :label="comment.comment"
                :value="comment.subcomments ? `有${comment.subcomments.length}条回复` : undefined" size="large" 
                :is-link="(comment.subcomments !== undefined)" @click="showSubComments(comment.subcomments, comment.name)" />
            </CellGroup>
        </div>        
    </div>

    <SubmitBar :price="3500" button-text="购买" @submit="onSubmit" />
    <Share v-model="showShare" />
    <Popup v-model:show="showPopup" position="bottom">
        <Cell :title="`对${popupName}的回复`" :value="`共${popupComments?.length}条`" size="large" />
        <Cell v-for="comment in popupComments" :title="comment.name" :label="comment.comment" size="large" />
    </Popup>
</template>

<script lang="ts" setup>
import { SubmitBar, Swipe, SwipeItem, NavBar, Sticky, CellGroup, Cell, Image, showToast, Popup, showImagePreview } from 'vant'
import { computed, ref } from 'vue';
import { More } from '@icon-park/vue-next';
import Share from '../components/Share.vue';
import { useWindowSize } from '@vant/use';

const showShare = ref(false)
const showPopup = ref(false)

const pics = ref([
    "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    "https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg",
    "https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg",
    "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
])

const details = ref({
    name: 'iPad',
    desc: '一个99新的iPad,一个99新的iPad,一个99新的iPad,一个99新的iPad,一个99新的iPad,一个99新的iPad,一个99新的iPad,一个99新的iPad,一个99新的iPad,一个99新的iPad,一个99新的iPad,一个99新的iPad,一个99新的iPad,一个99新的iPad,一个99新的iPad,一个99新的iPad,一个99新的iPad,一个99新的iPad.',
    region: '朝晖校区',
    methods: '快递/面交'
})

interface comment{
    comment: string,
    name: string,
    subcomments?: comment[]
}

const comments = ref<comment[]>([{
    name: '用户1',
    comment: '我觉得不行'
},{
    name: '用户2',
    comment: '我觉得可以，明天下单',
    subcomments: [{
        name: '用户1',
        comment: '真的嘛？我觉得不行'
    }]
}])

const onSubmit = () => {
    showToast("点击购买")
}

const popupComments = ref<comment[]>()
const popupName = ref('')

const showSubComments = (subcomments: comment[] | undefined, repliedName: string) => {
    popupComments.value = subcomments
    popupName.value = repliedName
    showPopup.value = true
}
</script>

<style scoped>
.main {
    overflow: scroll;
}
.content {
    margin-bottom: 80px;
}
</style>