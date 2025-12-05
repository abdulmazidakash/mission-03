import { Pool } from "pg";

export const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_xXB6QYS7nFAP@ep-fancy-cloud-a8ht0sq9-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require'
});

export const initDB = async()=>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(250) NOT NULL,
        email VARCHAR(250) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        age INT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);
        console.log('database connected ==>');
};