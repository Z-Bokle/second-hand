<template>
    <div class="userinfo">
        <Row :gutter="5">
            <Col :span="7">
                <Image round />
            </Col>
            <Col :span="7">
                <div class="username">
                    {{ userStore.userName }}
                </div>
            </Col>
        </Row>
    </div>
    <div class="features">
        <Grid>
            <GridItem icon="records" text="地址管理" :to="{name: 'Address'}" />
        </Grid>
    </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/utils/pinia';
import { Col, Row, Grid, GridItem, Image } from 'vant';

const userStore = useUserStore()

</script>

<style scoped>
.userinfo {
    height: 120px;
    background-color: rgb(245, 245, 232);
}
.username {
    font-weight: 600;
    font-size: large;
    margin-top: 30px;
}
.features {
    margin-top: 240px;
}
</style>