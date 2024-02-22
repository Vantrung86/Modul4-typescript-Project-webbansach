import db from "../config/config"

//lay product
export const getAllProduct=async()=>{
    try {
        const [result] = await db.execute("SELECT * FROM `product` JOIN catergory ON product.catergoryId=catergory.id");
        return result
    } catch (error) {
        console.log(error);
    }
};
//lay product theo id
export const getOneProductById=async(id:number)=>{
    try {
        const [result]:any = await db.execute("SELECT * FROM `product` WHERE productId=?",[id])    
        return result[0];
    } catch (error) {
        console.log(error);
    }
}
//them product
export const postOneProduct=async(obj:any)=>{
    try {
        const {nameProduct,src,price,author,catergoryId} = obj
        const [result]:any = await db.execute("INSERT INTO product (nameProduct,src,price,author,catergoryId) VALUES (?,?,?,?,?)",
        [nameProduct,src,+price,author,+catergoryId])
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}
//xoa product
export const deleteOneProduct=async(id:number)=>{
    try {
        const [result]:any = await db.execute("DELETE FROM product WHERE productId=?",[id])
        return result.insertId
    } catch (error) {
        console.log(error);
    }
}
//update product
export const putOneProduct=async(id:number,obj:any)=>{
    try {
        const {nameProduct,src,price,author,catergoryId} = obj
        const [result]:any = await db.execute("UPDATE product SET nameProduct=?,src=?,price=?,author=?,catergoryId=? WHERE productId=?"
        ,[nameProduct,src,+price,author,+catergoryId,id])
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}
//search product
export const searchProductMysql=async(search:string)=>{
    try {
        const [result] = await db.execute(`SELECT * FROM product WHERE nameProduct LIKE "%${search}%"`);
        return result
    } catch (error) {
        console.log(error);
    }
}
