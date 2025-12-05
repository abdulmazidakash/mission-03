import type { NextFunction, Request, Response } from "express";

const verify = (req: Request, res: Response, next: NextFunction)=>{
    console.log('vai id card anchen?')
};

export default verify;