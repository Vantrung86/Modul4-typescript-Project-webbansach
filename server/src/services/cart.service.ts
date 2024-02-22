import db from "../config/config";
//Lay cart theo userId
export const  getCartByUserId = async(user_id:number) => {
  try {
    const [cart_user] = await db.execute(
      "select * from cart join product on cart.productId = product.productId join catergory on product.catergoryId = catergory.id where userId = ?",
      [user_id]
    );
    return cart_user;
  } catch (error) {
    console.log(error);
  }
}
//kiem tra sp trong cart
export const checkProductCart = async(userId:number,productId:number) => {
    try {
        const [check]:any = await db.execute(
            "select * from cart where userId = ? and productId = ?",
            [userId,productId]
          );
          return check[0];
    } catch (error) {
        console.log(error);
    }
};
//them cart
export const addToCartMysql= async(userId:number,productId:number) =>{
    try {
      const [result]:any = await db.execute(
        "insert into cart (userId,productId, quantity) values (?,?,1)",
        [userId, productId]
      );
      return result.insertId;
    } catch (error) {
      console.log(error);
    }
  }
//update quantity
export const updateQuantity=async(userId:number,productId:number)=>{
    try {
      const [result]:any = await db.execute(
        "update cart set quantity = quantity + 1 where userId = ? and productId = ?",
        [userId,productId]
      );
      return result.insertId;
    } catch (error) {
      console.log(error);
    }
  }
  //delete cart
  export const deleteOneCart=async(cartId:number)=>{
    try {
      const [result]:any = await db.execute("DELETE FROM cart WHERE cartId=?",[cartId])
      return result.insertId
    } catch (error) {
      console.log(error);
    }
  }
  //giam quantity
  export const decreaseOneQuantity=async(cartId:number)=>{
    try {
      const [result]:any = await db.execute("UPDATE cart SET quantity = quantity - 1 WHERE cartId=?",[cartId]);
      return result.insertId
    } catch (error) {
      console.log(error);
    }
  }
  //tang quantity
  export const increaseOneQuantity=async(cartId:number)=>{
    try {
      const [result]:any = await db.execute("UPDATE cart SET quantity = quantity + 1 WHERE cartId=?",[cartId]);
      return result.insertId
    } catch (error) {
      console.log(error);
    }
  }
  //xoa all cart
  export const deleteAllCart=async(id:number)=>{
    try {
       const [result] = await db.execute("DELETE FROM cart WHERE userId=?",[id]);
       return result
    } catch (error) {
      console.log(error);
    }
  }
