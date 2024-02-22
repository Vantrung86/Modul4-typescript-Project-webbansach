import { Request, Response } from "express";
import { createOrderDetailMySql, getProductInBillMySql } from "../services/orderDetail.service";


//lay
export const getProductOrderDetail=async(req:Request,res:Response)=>{
    try {
        const {orderId} = req.params
        const result = await getProductInBillMySql(Number(orderId));
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
//tao
export const createOrderDetail=async(req:Request,res:Response)=>{
    try {
        const { orderId, dataCart } = req.body;
        await Promise.all(
            dataCart.map(async (product:any) => await createOrderDetailMySql(orderId, product.productId, product.quantity))
        )
        res.status(200).json({
            message: "Tạo orderDetail thành công"
        })
    } catch (error) {
        console.log(error);
    }
}
