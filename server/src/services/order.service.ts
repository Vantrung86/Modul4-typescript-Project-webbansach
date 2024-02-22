import db from "../config/config"

export const createOrderMysql=async(
  userId:number,
  totalOrderpay:number,
  dayOrder:string,
  nameOrder:string,
  address:string,
  name:string,
  SDT:string
)=>{
  try {
    const [result]:any = await db.execute(
      "INSERT INTO `order`(userId,totalOrderpay,dayOrder,nameOrder,address,name,SDT) VALUES (?,?,?,?,?,?,?)",
      [userId, totalOrderpay, dayOrder, nameOrder, address, name, SDT]
    );
    return result.insertId
  } catch (error) {
    console.log(error);
  }
};

//lay theo user
export const getBillByUserId=async(id:number)=>{
  try {
    const [result] = await db.execute("select * from `order` where userId=?",[id])
    return result
  } catch (error) {
    console.log(error);
  }
}
//lay tat ca order
export const getAllOrderMysql=async()=>{
  try {
    const [result] = await db.execute("select * from `order`");
    return result
  } catch (error) {
    console.log(error);
  }
}
//status huy
export const putOrderCancelMysql=async(id:number)=>{
  try {
    const [result]:any = await db.execute("UPDATE `order` SET status=? WHERE orderId=?",["Huỷ",id]);
    return result.insertId
  } catch (error) {
    console.log(error);
  }
}
//status duyet
export const patchOrederAccessMysql=async(id:number)=>{
  try {
    const [result]:any = await db.execute("UPDATE `order` SET status=? WHERE orderId=?",["Duyệt",id]);
    return result.insertId
  } catch (error) {
    console.log(error);
  }
}

