import { Request, Response } from "express";
import { deleteOneCatergory, getAllCatergory, getBySearch, postOneCatergory, putOneCatergory } from "../services/catergory.service";


//lay
export const getCatergory=async(req:Request,res:Response)=>{
    try {
        const result = await getAllCatergory()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
};
//them
export const postCatergory=async(req:Request,res:Response)=>{
    const {catergoryName} = req.body;
    const id = await postOneCatergory(String(catergoryName))
    if (!id) {
        return res.status(500).json({
            message:"Có lỗi"
        })
    }
    res.status(201).json({
        message:"Thêm catergory thành công"
    })
}

//xoa
export const deleteCatergory=async(req:Request,res:Response)=>{
    try {
        const {id} = req.params
        const result = await deleteOneCatergory(Number(id))
        if (result) {
            return res.status(500).json({
                message:"Có lỗi"
            })
        }
        res.status(200).json({
            message:"Đã xoá thành công"
        })
    } catch (error) {
        console.log(error);
    }
}

//Update
export const putCatergory=async(req:Request,res:Response)=>{
    try {
        const {id} = req.params;
        const {catergoryName} = req.body
        const result = await putOneCatergory(Number(id),String(catergoryName));
        if (result) {
            return res.status(500).json({
                message:"Có lỗi"
            })
        }
        res.status(200).json({
            message:"Cập nhật thành công"
        })
    } catch (error) {
        console.log(error);
    }
}
//search
export const getSearch=async(req:Request,res:Response)=>{
    try {
        const {key} = req.query
        const result = await getBySearch(String(key))
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
