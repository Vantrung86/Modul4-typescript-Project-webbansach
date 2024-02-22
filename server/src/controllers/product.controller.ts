import { Request, Response } from "express";
import { deleteOneProduct, getAllProduct, getOneProductById, postOneProduct, putOneProduct, searchProductMysql } from "../services/product.service";


//lay product
export const getProduct=async(req:Request,res:Response)=>{
    try {
        const result = await getAllProduct()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
//lay product theo id
export const getProductById=async(req:Request,res:Response)=>{
    try {
        const {id} = req.params
        const result = await getOneProductById(Number(id))
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
//them product
export const postProduct=async(req:Request,res:Response)=>{
    try {
        const id = await postOneProduct(req.body)
        if (!id) {
            return res.status(500).json({
                message:"Lối server"
            })
        }
        res.status(201).json({
            message:"Thêm thành công"
        })
    } catch (error) {
        console.log(error);
    }
}
//xoa product
export const deleteProduct=async(req:Request,res:Response)=>{
    try {
        const {id} = req.params
        const result = await deleteOneProduct(Number(id))
        if (result) {
            return res.status(500).json({
                message:"Lối server"
            })
        }
        res.status(200).json({
            message:"Xoá thành công"
        })
    } catch (error) {
        console.log(error);
    }
}
//update product
export const putProduct=async(req:Request,res:Response)=>{
    try {
        const {id} = req.params
        const result = await putOneProduct(Number(id),req.body)
        if (result) {
            return res.status(500).json({
                message:"Lối server"
            })
        }
        res.status(201).json({
            message:"Cập nhật thành công"
        })
    } catch (error) {
        console.log(error);
    }
}
//search product
export const searchProduct=async(req:Request,res:Response)=>{
    try {
        const {key} = req.query
        const result = await searchProductMysql(String(key))
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
