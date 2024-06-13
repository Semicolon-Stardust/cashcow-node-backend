import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";

// Model Imports
import User from "../models/userModel.js";

export const isUserAuthenticated = catchAsyncErrors( async (req: any, res: Response, next:NextFunction) => {

    const {token} = req.cookies;

    if (!token){
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    const decodedData: any = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = await User.findById(decodedData.id);

    next();

}) 


export const authorizeRoles = (...roles: string[]) => {

    return (req: any, res: Response, next:NextFunction) => {

        if (!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
        }

        next();
    }
} 