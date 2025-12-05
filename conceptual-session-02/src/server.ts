import express, { type Request, type Response } from 'express';
import { initDB } from './database/db';
import { userRoute } from './modules/user/user.route';
import { authRoute } from './modules/auth/auth.route';

const app = express();
app.use(express.json());

initDB();

app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);

app.get('/', (req: Request, res: Response)=>{
    res.status(200).json({
        message: 'this is a root route',
        path: req.path,
    })
})

app.listen(5000, ()=>{
    console.log('server is running on port 5000');
});