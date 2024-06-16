import { ObjectId } from "mongoose";

export interface IUser extends Document {
    username: string;
    name: string;
    email: string;
    password: string;
    dob: Date;
    primaryCurrency: string;
    ocupation: string;
    role: string;
    resetPasswordToken: string | undefined;
    resetPasswordExpire: Date | undefined;
    comparePassword: (enteredPassword: string) => Promise<boolean>;
    getJWTToken: () => string;
    resetPasswordTokenGenerator: () => string;
}

export interface ITransaction extends Document {
    title: string,
    description: string,
    amount: number,
    category: string,
    user: ObjectId,
    family: ObjectId | null,
    createdAt: Date
}

export interface IFamily extends Document {
    name: string,
    description: string,
    members: ObjectId[],
    category: string,
    admin: ObjectId[],
    createdAt: Date
}

