import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import User from "../models/userModel.js";
import sendToken from "../utils/generateJWT.js";
import sendMail from "../utils/sendMail.js";
import crypto from "crypto";



// Register a User
export const registerUser = catchAsyncErrors(async (req:Request, res:Response, next:NextFunction) => {

    const {name, email, password, dob, primaryCurrency, ocupation} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        dob,
        primaryCurrency,
        ocupation
    }); 

    sendToken(user, 201, res);

})




// Login User
export const loginUser = catchAsyncErrors(async (req:Request, res:Response, next:NextFunction) => {

    const {email, password} = req.body

    if (!email || !password) return next(new ErrorHandler("Enter Email and Password", 400));

    const user = await User.findOne({email}).select("+password")
    if (!user) return next(new ErrorHandler("Invalid Email or Password", 401));

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) return next(new ErrorHandler("Invalid Email or Password", 401));

    sendToken(user, 200, res);

})





// Logout User
export const logoutUser = catchAsyncErrors(async (req:Request, res:Response, next:NextFunction) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "logged out successfully !"
    })

})



// Forgot password

export const forgotPassword = catchAsyncErrors(async (req:Request, res:Response, next:NextFunction) => {

    const user = await User.findOne({email: req.body.email});

    if (!user){
        return next(new ErrorHandler("User Not Found !", 404));
    }

    const resetToken = await user.resetPasswordTokenGenerator();

    await user.save({ validateBeforeSave: false })

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const msg = `Here is your reset password link: ${resetPasswordUrl} 
    
    Ignore if you didn't click forgot password !`;

    try{

        await sendMail({
            email: user.email,
            subject: "Ecommerce Password Recovery Email",
            message: msg
        })

        res.status(201).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })

    }
    catch (error: any){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});

        res.status(400).json({
            success: false,
            message: error.message    
        })
    }

})




// Reset Password

export const resetPassword = catchAsyncErrors(async (req:Request, res:Response, next:NextFunction) => {
 
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {
            $gt: Date.now()
    }})

    if (!user){
        return next(new ErrorHandler("Password Reset token is Invalid or has been Expired !", 400));
    }

    if (req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Passwords does not match !", 400))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    // this.resetPasswordToken = undefined;
    // this.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 201, res);


})



// Get User Details

export const getUserDetails = catchAsyncErrors(async (req:any, res:Response, next:NextFunction) => {

    const user = await User.findById(req.user.id);
    
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    res.status(201).json({
        success: true,
        user
    })

})




// Update user password

export const updateUserPassword = catchAsyncErrors(async (req:any, res:Response, next:NextFunction) => {

    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched){
        return next(new ErrorHandler("Old Password is Incorrect !", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Passwords didn't match !", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 201, res);
})


// Update User Profile

export const updateUserProfile = catchAsyncErrors(async (req:any, res:Response, next:NextFunction) => {
    
        const newUserData = {
            name: req.body.name,
            email: req.body.email
        }

        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })


        res.status(201).json({
            success: true,
        })
    })




// Get all Users (admin)

export const getAllUsers = catchAsyncErrors(async (req:Request, res:Response, next:NextFunction) => {
    
        const users = await User.find();
    
        res.status(201).json({
            success: true,
            users
        })
    
})


// Get Specific User Details (admin)

export const getOneUser = catchAsyncErrors(async (req:Request, res:Response, next:NextFunction) => {
    
    const users = await User.findById(req.params.id);

    if (!users){
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 400));
    }

    res.status(201).json({
        success: true,
        users
    })

})

