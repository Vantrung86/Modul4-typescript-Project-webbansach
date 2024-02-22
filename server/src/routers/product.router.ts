import { deleteProduct, getProduct, getProductById, postProduct, putProduct, searchProduct } from "../controllers/product.controller";
import {Express } from 'express';


export const productRouter=(app:Express)=>{
    app.get("/api/v1/product", getProduct);
    app.get("/api/v1/product/:id",getProductById)
    app.post("/api/v1/product",postProduct);
    app.delete("/api/v1/product/:id", deleteProduct);
    app.put("/api/v1/product/:id", putProduct);
    app.get("/api/v1/searchProduct",searchProduct)
}