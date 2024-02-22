import { login, register } from "../controllers/user.controller";
import { checkEmailExist, checkEmpty, checkEmptyLogin } from "../middleware/middleware";
import {Express } from 'express';


export const userRouter=(app:Express)=>{
    app.post("/api/v1/register",checkEmpty,checkEmailExist,register);
    app.post("/api/v1/login",checkEmptyLogin, login)
};
