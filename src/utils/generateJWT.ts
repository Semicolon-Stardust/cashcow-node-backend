// Creating and Saving Cookie

import { Response } from "express";

const sendToken = async function (user: any, statusCode:number, res:Response){

    const token = await user.getJWTToken();

    // Cookie Options
    const options = {

        httpOnly: true,
        expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000),
        secure: false,
    }

    

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    });

} 


export default sendToken;