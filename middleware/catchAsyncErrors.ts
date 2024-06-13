import { Request, Response, NextFunction } from "express";

const catchAsyncErrors = (callback: any) => (req: Request, res: Response, next: NextFunction) => {

    Promise.resolve(callback(req, res, next)).catch(next);
}

export default catchAsyncErrors;