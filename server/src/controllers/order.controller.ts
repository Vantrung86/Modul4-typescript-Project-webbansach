import { Request, Response } from "express";
import { createOrderMysql, getAllOrderMysql, getBillByUserId, patchOrederAccessMysql, putOrderCancelMysql } from "../services/order.service";


//tao
export const createOrder=async(req:Request,res:Response)=>{
    try {
        const {userId,totalOrderpay,dayOrder,nameOrder,address,name,SDT} = req.body
        const idOrder = await createOrderMysql(userId,totalOrderpay,dayOrder,nameOrder,address,name,SDT)
        res.status(201).json({idOrder})
    } catch (error) {
        console.log(error);
    }
}
//lay theo user
export const getBillByUser=async(req:Request,res:Response)=>{
    try {
        const {id} = req.params
        const result = await getBillByUserId(Number(id))
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
//lay tat ca order
export const getAllOrder=async(req:Request,res:Response)=>{
    try {
        const result = await getAllOrderMysql();
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
//status huy
export const putOrderCancel=async(req:Request,res:Response)=>{
    try {
        const {orderId} = req.params
        await putOrderCancelMysql(Number(orderId))
        res.status(200).json()
    } catch (error) {
        console.log(error);
    }
}
//status Duyet
export const patchOrederAccess=async(req:Request,res:Response)=>{
    try {
        const {orderId} = req.params
        await patchOrederAccessMysql(Number(orderId))
        res.status(200).json()
    } catch (error) {
        console.log(error);
    }
}
