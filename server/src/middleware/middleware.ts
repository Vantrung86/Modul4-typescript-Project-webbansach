import jwt from "jsonwebtoken"
import { checkUserByEmail } from "../services/user.service";
import { NextFunction, Request, Response } from "express";

//check email
export const checkEmailExist = async (req:Request, res:Response, next:NextFunction) => {
  const { email } = req.body;
  const checkEmail = await checkUserByEmail(email);
  if (checkEmail) {
    return res.status(400).json({
      message: "Email đã được đăng ký",
    });
  }
  next();
};

//check rỗng register
export const checkEmpty=(req:Request, res:Response, next:NextFunction)=>{
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Không được để trống",
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

//check rỗng ở login
export const checkEmptyLogin=(req:Request, res:Response, next:NextFunction)=>{
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          message: "Không được để trống",
        });
      }
      next();
    } catch (error) {
      console.log(error);
    }
  }

export const verifyToken = (req:Request, res:Response, next:NextFunction) => {
  try {
    // Lấy token
    // authorization: Bearer token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Không tìm thấy token" });
    }
    jwt.verify(token, "MABIMATJWT", (err, data:any) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          // Nếu token đã hết hạn
          return res.status(401).json({ message: "Token đã hết hạn" });
        } else {
          // Nếu token không hợp lệ
          return res.status(403).json({ message: "Token không hợp lệ" });
        }
      }
      // Nếu token hop le
      if (data.role != 1) {
        return res
          .status(403)
          .json({ message: "Bạn không được cấp quyền để thực hiện việc này!" });
      }
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
