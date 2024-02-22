import db from "../config/config"

//lay
export const getAllUser=async()=>{
    try {
        const [result] = await db.execute("SELECT * FROM users");
        return result;
    } catch (error) {
        console.log(error);
    }
};
//cap nhat status
export const putOneUser=async(id:number,status:boolean)=>{
    try {
        const [result]:any = await db.execute("UPDATE users SET status=? WHERE id=?",[!status,id])
        return result.insertId
    } catch (error) {
        console.log(error);
    }
}
