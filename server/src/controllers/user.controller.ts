import argon from "argon2"
import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import { addUser, checkUserByEmail } from "../services/user.service";
import dotenv from "dotenv"
dotenv.config()

export const register=async(req:Request,res:Response)=>{
    try {
        const {username,email,password,phonenumber,address} = req.body;
        const hashedPassword = await argon.hash(password);
        const id = await addUser(username,hashedPassword,email,phonenumber,address)
        if (!id) {
            return res.status(500).json({
                message:"server lỗi"
            })
        }
        res.status(201).json({
            message:"Đăng ký thành công"
        })
    } catch (error) {
        console.log(error);
    }
};

export const login=async(req:Request,res:Response)=>{
    try {
        const {email,password} = req.body
        const user = await checkUserByEmail(email)
        if (!user) {
            return res.status(400).json({ message: "email không tồn tại" });
        }
        const checkPassword = await argon.verify(user.password,password);
        if (!checkPassword) {
            return res.status(400).json({ message: "sai mật khẩu" });
          }
          const token = jwt.sign(
            { id: user.id, role: user.role },
            String(process.env.JWT_SECRET)
          );
          res.status(200).json({
            message: "Đăng nhập thành công",
            token,
            user
          });
    } catch (error) {
        console.log(error);
    }
}
