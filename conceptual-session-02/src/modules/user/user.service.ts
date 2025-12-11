import bcrypt from "bcryptjs";
import { pool } from "../../database/db";

const createUserIntoDB = async (payload: Record<string, unknown>) => {
    // const body = req.body;
    const { name, email, password, role } = payload;
    // console.log(body);
    const hashedPassword = await bcrypt.hash(password as string, 12);
    const result = await pool.query(`
            INSERT INTO users(name,email,password, role) VALUES($1,$2,$3, $4) RETURNING *
            `, [name, email, hashedPassword, role]);

    console.log(result.rows[0]);

    // delete result.rows[0].password
    return result;
};

const getUserIntoDB = async () => {
    const result = await pool.query(`
            SELECT id,name,email,age,created_at, updated_at FROM users
            `,);

    console.log(result);

    // delete result.rows[0].password
    return result;
};

const getSingleUserIntoDB = async (email: string) => {
    const result = await pool.query(`
            SELECT id,name,email,age,created_at, updated_at FROM users WHERE email=$1
            `,[email]);

    console.log(result);

    // delete result.rows[0].password
    return result;
};

export const userServices = {
    createUserIntoDB,
    getUserIntoDB,
    getSingleUserIntoDB,
};