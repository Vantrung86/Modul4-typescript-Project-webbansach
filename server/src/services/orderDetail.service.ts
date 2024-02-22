import db from "../config/config"
//lay
export const getProductInBillMySql=async(orderId:number)=>{
    try {
        const [result] = await db.execute(
            "SELECT * FROM `order` join oderdetail on order.orderId = oderdetail.orderId join product on oderdetail.productId = product.productId where order.orderId = ?",
            [orderId]
        );
        return result
    } catch (error) {
        console.log(error);
    }
}
//tao
export const createOrderDetailMySql=async(orderId:number, productId:number, quantity:number)=>{
    try {
        const [result] = await db.execute(
            "insert into oderdetail (orderId, quantity, productId) values (?,?,?)",
            [orderId, quantity, productId]
        );
        return result;
    } catch (error) {
        console.log(error);
    }
}
