import * as VueRouter from 'vue-router';
import Welcome from '../views/Welcome.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Main from '../views/Home/Main.vue';
import OrderList from '../views/Home/OrderList.vue';
import Message from '../views/Home/Message.vue';
import Profile from '../views/Home/Profile.vue';
import Publish from '../views/Publish.vue';
import Detail from '../views/Detail.vue';
import Trade from '../views/Trade.vue';
import Address from '../views/Address.vue';
import AddressEdit from '../views/Address/AddressEdit.vue';
import AddressAdd from '@/views/Address/AddressAdd.vue';
import Order from '@/views/Order.vue'

const routes = [
    {path: '/', name: 'Welcome', component: Welcome},
    {path: '/register', name: 'Register', component: Register},
    {path: '/login', name: 'Login', component: Login},
    {path: '/home', name: 'Home', component: Home, children: [
        {path: '', name: 'Main', component: Main}, // 首页
        {path: 'order', name: 'OrderList', component: OrderList}, // 查看订单
        {path: 'message', name: 'Message', component: Message}, // 消息查看
        {path: 'profile', name: 'Profile', component: Profile} // 我的
    ]},
    {path: '/publish', name: 'Publish', component: Publish}, // 发布商品
    {path: '/detail/:id', name: 'Detail', component: Detail}, // 商品详情
    {path: '/trade/:id', name: "Trade", component: Trade}, // 交易
    {path: '/address', name: 'Address', component: Address}, // 地址管理
    {path: '/address/edit/:id', name: 'AddressEdit', component: AddressEdit}, // 地址修改
    {path: '/address/add', name: 'AddressAdd', component: AddressAdd}, // 地址添加
    {path: '/order/:id', name:'Order', component: Order} // 订单详情
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: routes
})

export default router;