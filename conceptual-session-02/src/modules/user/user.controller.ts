import type { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async(req: Request, res: Response)=>{
    try {
        const result = await userServices.createUserIntoDB(req.body);
        return res.status(201).json({
            success: true,
            message: 'users created successfully',
            data: result.rows[0],
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error?.message,
        })
    }
};

const getUser = async(req: Request, res: Response)=>{
    try {
        const result = await userServices.getUserIntoDB();
        return res.status(200).json({
            success: true,
            message: 'users retrieved successfully',
            data: result.rows,
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error?.message,
        })
    }
};

const getSingleUser = async(req: Request, res: Response)=>{
    try {
        const email = req.user!.email;
        const result = await userServices.getSingleUserIntoDB(email);
        return res.status(200).json({
            success: true,
            message: 'single user get successfully',
            data: result.rows[0],
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error?.message,
        })
    }
};

export const userController = {
    createUser,
    getUser,
    getSingleUser,
}