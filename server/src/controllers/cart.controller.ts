import { Request,Response } from 'express';
import { addToCartMysql, checkProductCart, decreaseOneQuantity, deleteAllCart, deleteOneCart, getCartByUserId, increaseOneQuantity, updateQuantity } from '../services/cart.service';


//lay cart
export const getCart=async(req:Request,res:Response)=>{
    try {
        const {userId} = req.params
        const cart = await getCartByUserId(Number(userId))
        res.status(200).json(cart)
    } catch (error) {
        console.log(error);
    }
}

//them 
export const addToCart=async(req:Request,res:Response)=>{
    try {
        const {userId} = req.params
        const {productId} = req.body
        const check = await checkProductCart(Number(userId),Number(productId));
        if (!check) {
            await addToCartMysql(Number(userId),Number(productId));
            return res.status(201).json({
                message:"Thêm cart thành công"
            })
        }
        await updateQuantity(Number(userId),Number(productId));
        res.status(200).json({
          message: "Thêm quantity thành công",
        });   
    } catch (error) {
        console.log(error);
    }
};

//xoa
export const deleteCart=async(req:Request,res:Response)=>{
    try {
        const {cartId} = req.params
        const id = await deleteOneCart(Number(cartId))
        if (id) {
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
//giam quantity
export const decreaseQuantity=async(req:Request,res:Response)=>{
    try {
        const {cartId} = req.params
        const id = await decreaseOneQuantity(Number(cartId))
        if (id) {
            return res.status(500).json({
                message:"Lối server"
            })
        }
        res.status(200).json({
            message:"Giảm quantity thành công"
        })
    } catch (error) {
        console.log(error);
    }
}
//tang quantity
export const increaseQuantity=async(req:Request,res:Response)=>{
    try {
        const {cartId} = req.params
        const id = await increaseOneQuantity(Number(cartId))
        if (id) {
            return res.status(500).json({
                message:"Lối server"
            })
        }
        res.status(200).json({
            message:"Tăng quantity thành công"
        })
    } catch (error) {
        console.log(error);
    }
}
//xoa theo user
export const deleteCartByUser=async(req:Request,res:Response)=>{
    try {
        const {id} = req.params
        await deleteAllCart(Number(id));
        res.status(200).json()
    } catch (error) {
        console.log(error);
    }
}
