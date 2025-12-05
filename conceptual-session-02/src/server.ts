import express, { type Request, type Response } from 'express';
import { Pool } from 'pg';

const app = express();
app.use(express.json());

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_xXB6QYS7nFAP@ep-fancy-cloud-a8ht0sq9-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require'
});

const initDB = async()=>{
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

initDB();

app.post('/users', async(req: Request, res: Response)=>{
    // const body = req.body;
    const { name, email, password } = req.body;
    // console.log(body);
    const result = await pool.query(`
        INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *
        `, [name,email,password]);
    console.log(result);
    res.status(201).json({
        success: true,
        message: 'users created successfully',
        data: result.rows[0],
    })
})

app.get('/', (req: Request, res: Response)=>{
    res.status(200).json({
        message: 'this is a root route',
        path: req.path,
    })
})

app.listen(5000, ()=>{
    console.log('server is running on port 5000');
})