import request from "./request";
import qs from 'qs';

const login = (userId: string, password: string) => request.post<any>('/user/login', {userId, password})
const getGoodsByUUID = (cNo: string) => request.get<any>(`/Goods/getGoodsByUUIDcNo=${cNo}`)
const getCommentListByGoodsUUID = (cNo: string) => request.get<any>(`/goods/comment/getCommentListByGoodsUUID?cNo=${cNo}`)
const returnDealDetail = (orderId: string) => request.get<any>('/deal/returnDealDetail', {orderId})
const returnProcessInfo = (orderId: string) => request.get('/deal/returnProcessInfo', {orderId})
const updateDealStatus1 = (orderId: string) => request.get<any>(`/deal/updateDealStatus1orderId=${orderId}`)
const dealFilter = (size: number, page: number) => request.get(`/deal/dealFiltersize=${size}&page=${page}`, )
const insertToCar = (cNo: string, userId: string) => request.post<any>('/shopCar/insertToCar', {cNo, userId})

export {
    login,
    getGoodsByUUID,
    getCommentListByGoodsUUID,
    returnDealDetail,
    returnProcessInfo,
    updateDealStatus1,
    dealFilter,
    insertToCar
}