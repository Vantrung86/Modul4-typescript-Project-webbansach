import { createOrder, getAllOrder, getBillByUser, patchOrederAccess, putOrderCancel } from "../controllers/order.controller";
import {Express } from 'express';


export const orderRouter = (app:Express) => {
    app.post("/api/v1/order",createOrder);
    app.get("/api/v1/orders",getAllOrder)
    app.get("/api/v1/order/:id",getBillByUser);
    app.put("/api/v1/order/:orderId",putOrderCancel);
    app.patch("/api/v1/order/:orderId",patchOrederAccess);
}