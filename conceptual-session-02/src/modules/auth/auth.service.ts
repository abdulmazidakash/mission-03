import { pool } from "../../database/db";

const loginUserIntoDB = async(email:string, password: string)=>{
    const user = pool.query('');
};

export const authServices = {
    loginUserIntoDB,
}