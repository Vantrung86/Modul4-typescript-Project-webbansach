import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import dotenv from "dotenv";
import { cartRouter } from "./routers/cart.router";
import { catergoryRouter } from "./routers/catergory.router";
import { orderRouter } from "./routers/order.router";
import { orderDetailRouter } from "./routers/orderDetail.router";
import { productRouter } from "./routers/product.router";
import { userRouter } from "./routers/user.router";
import { userManagerRouter } from "./routers/userManager.router";
dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

cartRouter(app)
catergoryRouter(app)
orderRouter(app)
orderDetailRouter(app)
productRouter(app)
userRouter(app)
userManagerRouter(app)

app.listen(process.env.PORT,()=>{
    console.log(`Đã chạy vào cổng ${process.env.PORT}`); 
})