import { createOrderDetail, getProductOrderDetail } from "../controllers/orderDetail.controller"
import {Express } from 'express';


export const orderDetailRouter = (app:Express) => {
    app.get("/api/v1/orderDetail/:orderId",getProductOrderDetail)
    app.post("/api/v1/orderDetail",createOrderDetail)
}