import { addToCart, decreaseQuantity, deleteCart, deleteCartByUser, getCart, increaseQuantity } from "../controllers/cart.controller";
import {Express } from 'express';


export const cartRouter = (app:Express) => {
    app.post("/api/v1/cart/:userId",addToCart);
    app.get("/api/v1/cart/:userId",getCart);
    app.delete("/api/v1/cart/:cartId",deleteCart);
    app.put("/api/v1/decrease/:cartId",decreaseQuantity);
    app.put("/api/v1/increase/:cartId",increaseQuantity);
    app.delete("/api/v1/carts/:id",deleteCartByUser)
}
