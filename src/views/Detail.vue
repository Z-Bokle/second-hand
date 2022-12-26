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
                <Cell title="上架时间" :value="details.addTime" size="large" />
                <Cell title="标签" size="large" >
                    <template #value>
                        <Tag size="large" class="tag">{{ details.tag }}</Tag>
                    </template>
                </Cell>
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
import { SubmitBar, Swipe, SwipeItem, NavBar, Sticky, Tag, CellGroup, Cell, Image, showToast, Popup, showImagePreview, showFailToast } from 'vant'
import { computed, onBeforeMount, ref } from 'vue';
import { More } from '@icon-park/vue-next';
import Share from '../components/Share.vue';
import { useWindowSize } from '@vant/use';
import { useRoute, useRouter } from 'vue-router';
import { getCommentListByGoodsUUID, getGoodsByUUID } from '@/utils/api';

const router = useRouter()
const route = useRoute()

const showShare = ref(false)
const showPopup = ref(false)

const pics = ref<string[]>([])

const details = ref({
    name: 'iPad',
    region: '朝晖校区',
    methods: '快递/面交',
    tag: '苹果',
    desc: '',
    addTime: ''
})

interface comment{
    comment: string,
    name: string,
    subcomments?: comment[]
}

const comments = ref<comment[]>([])

const onSubmit = () => {
    router.push({name: 'Trade', params:{ id: route.params['id'] }})
}

const popupComments = ref<comment[]>()
const popupName = ref('')

const showSubComments = (subcomments: comment[] | undefined, repliedName: string) => {
    if(subcomments === undefined) return
    popupComments.value = subcomments
    popupName.value = repliedName
    showPopup.value = true
}

onBeforeMount(() => {
    let id:string = typeof route.params['id'] === 'string' ? route.params['id'] :route.params['id'][0]
    getGoodsByUUID(id)
    .then((res) => {
        if(!res || res.data.code != 206) throw new Error("获取商品详情失败")
        details.value.name = res.data.data.cName
        details.value.region = res.data.data.place
        details.value.methods = res.data.data.way
        details.value.tag = res.data.data.type
        details.value.desc = res.data.data.detail
        details.value.addTime = res.data.data.addTime
        res.data.data.pictureList.forEach((element: {picture: string}) => {
            pics.value.push(element.picture)
        })

    })
    .catch((err: Error) => {
        showFailToast(err.message)
    })

    getCommentListByGoodsUUID(id)
    .then((res) => {
        if(!res || res.data.code != 206) throw new Error("评论获取失败")
        res.data.result.forEach((comment: { edetail: any; userId: any; }) => {
            const { edetail, userId } = comment // destructor
            comments.value.push({
                name: userId,
                comment: edetail
            })
        })
    })
    .catch((err: Error) => {
        showFailToast(err.message)
    })

})
</script>

<style scoped>
.main {
    overflow: scroll;
}
.content {
    margin-bottom: 80px;
}
.tag {
    margin-right: 5px;
}
</style>