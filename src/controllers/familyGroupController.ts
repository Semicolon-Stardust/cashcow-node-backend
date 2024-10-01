import { NextFunction, Request, Response } from 'express'
import catchAsyncErrors from '../middleware/catchAsyncErrors.js'
import mongoose, { ObjectId } from 'mongoose';
import Family from '../models/familyGroupModel.js';
import ErrorHandler from '../utils/errorHandler.js';
import { ICreateFamilyGroup } from '../interfaces/familyInterfaces.js';




// ---------------- User Options ---------------- //

//     Create a new family group
export const createFamilyGroup = catchAsyncErrors(async (req: any, res: Response, next: NextFunction) => {

    let { name, description, members, category, admins }: ICreateFamilyGroup = req.body;

    let admin: ObjectId = req.user.id;

    let memberCount: number;
    if (!members || members === undefined || members.length === 0) {
        members = [admin];
        memberCount = 1;
    } else {
        memberCount = members.unshift(admin)
    }

    const family = await Family.create({
        name,
        description,
        members,
        category,
        admins
    });

    res.status(201).json({
        success: true,
        family,
        memberCount
    })
})


//    Get all family groups of a user
export const getUserFamilyGroups = catchAsyncErrors(async (req: any, res: Response, next: NextFunction) => {
    
        const familyGroups = await Family.find({ admin: req.user.id });
    
        res.status(200).json({
            success: true,
            familyGroups,
            hits: familyGroups.length
        })
})


export const addMemberToFamily = catchAsyncErrors(async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let { memberId, role } = req.body;

    if (!role) role = "member"

    if (memberId === req.user.id) {
        return next(new ErrorHandler("User is already an admin", 400));
    }

    const family = await Family.findById(id);

    if (!family) {
        return next(new ErrorHandler("Family not found", 404));
    }

    if (family.admin.includes(memberId)) {
        return next(new ErrorHandler("User is already an admin", 400));
    }

    if (family.members.includes(memberId)) {
        return next(new ErrorHandler("Member already exists", 400));
    }

    family.members.push(memberId);

    await family.save();

    res.status(200).json({
        success: true,
        family,
        memberCount: family.members.length
    })
})