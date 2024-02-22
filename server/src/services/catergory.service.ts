import db from "../config/config"
//lay
export const getAllCatergory=async()=>{
    try {
        const [result] = await db.execute("SELECT * FROM catergory");
        return result
    } catch (error) {
        console.log(error);
    }
};
//them
export const postOneCatergory=async(name:string)=>{
    try {
        const [result]:any = await db.execute("INSERT INTO catergory (catergoryName) VALUES (?)",[name]);
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}

//xoa
export const deleteOneCatergory=async(id:number)=>{
    try {
        const [result]:any = await db.execute("DELETE FROM catergory WHERE id=?",[id]);
        return result.insertId
    } catch (error) {
        console.log(error);
    }
}
//update
export const putOneCatergory=async(id:number,name:string)=>{
    try {
        const [result]:any = await db.execute("UPDATE catergory SET catergoryName=? WHERE id=?", [name,id]);
        return result.insertId
    } catch (error) {
        console.log(error);
    }
}
//search
export const getBySearch=async(search:string)=>{
    try {
        const [result] = await db.execute(`SELECT * FROM catergory WHERE catergoryName LIKE "%${search}%"`)
        return result
    } catch (error) {
        console.log(error);
    }
}
