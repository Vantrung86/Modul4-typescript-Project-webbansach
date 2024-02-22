import mysql2 from "mysql2";
import dotenv from "dotenv";
dotenv.config()

const pool = mysql2.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PW,
    database:process.env.DB_DATABASE,
    port:Number(process.env.DB_PORT)
})
const database = pool.promise();
export default database