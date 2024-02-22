import { Request, Response } from "express";
import { getAllUser, putOneUser } from "../services/userManager.service";


//lay 
export const getUser=async(req:Request,res:Response)=>{
    try {
        const result = await getAllUser();
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
};
//status
export const putUser=async(req:Request,res:Response)=>{
    try {
        const {id} = req.params
        const {status} = req.body
        const result = await putOneUser(Number(id),status)
        if (result) {
            return res.status(500).json({
                message:"Lối server"
            })
        }
        res.status(200).json({
            message:"Cập nhật status thành công"
        })
    } catch (error) {
        console.log(error);
    }
}
