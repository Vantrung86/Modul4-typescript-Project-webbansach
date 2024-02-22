import db from "../config/config"

export const checkUserByEmail=async(email:string)=>{
    try {
        const [findUser]:any = await db.execute("SELECT * FROM users WHERE email=?",[email]);
        return findUser[0]
    } catch (error) {
        console.log(error);
    }
}

export const addUser=async(username:string, password:string, email:string,phonenumber:string,address:string)=>{
    try {
      const [result]:any = await db.execute(
        "insert into users (username, password, email,phonenumber,address) values (?, ?, ?,?,?)",
        [username, password, email, phonenumber, address]
      );
      return result.insertId;
    } catch (error) {
      console.log(error);
    }
  }
