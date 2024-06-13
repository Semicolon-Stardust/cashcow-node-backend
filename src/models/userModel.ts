import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { IUser } from "../interfaces/schemaInterfaces.js";

const userSchema = new mongoose.Schema<IUser>({

    name: {
        type: String,
        required: [true, "Please Enter a Name"],
        min: [2, "Please provide a longer name"]
    },
    email: {
        type: String,
        required: [true, "Please provide an Email Address"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Provide a Password"],
        min: [8, "Please provide a password of atleast 8 Characters"],
        select: false
    },
    dob: {
        type: Date,
        required: [true, "Please provide your Date of Birth"],
    },
    primaryCurrency: {
        type: String,
        required: [true, "Please select your primary currency"],
    },
    ocupation: {
        type: String,
        required: [true, "Please enter your ocupation"],
    },
    role: {
        type: String,
        default: "user"
    },

    
    resetPasswordToken: String,
    resetPasswordExpire: Date

});


// Hash the password before saving
userSchema.pre("save", async function (next){

    if (!this.isModified("password")){
        next();
    }

    this.password = await bcryptjs.hash(this.password, 10);
})


// For comparing hash and password
userSchema.methods.comparePassword = async function(enteredPassword: string) {
    return await bcryptjs.compare(enteredPassword, this.password);
}


// To generate a JWT token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES
    })
}

// Generates and returns a reset password token
userSchema.methods.resetPasswordTokenGenerator = function () {
    
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000

    return resetToken;

}



const userModel = mongoose.model("User", userSchema);
export default userModel;
