import { NextFunction, Request, Response } from 'express'
import catchAsyncErrors from '../middleware/catchAsyncErrors.js'
import { ObjectId } from 'mongoose';
import Family from '../models/familyGroupModel.js';


interface ICreateFamilyGroup{
    name: string,
    description: string,
    members: ObjectId[],
    category: string
}


// ---------------- User Options ---------------- //

//     Create a new family group
export const createFamilyGroup = catchAsyncErrors(async (req: any, res: Response, next: NextFunction) => {

    let { name, description, members, category }: ICreateFamilyGroup = req.body;

    let admin: ObjectId = req.user.id;

    let memberCount: number;
    if (!members || members === undefined || members.length === 0) {
        members = [admin];
        memberCount = 1;
    } else {
        memberCount = members.unshift(admin);
    }

    const family = await Family.create({
        name,
        description,
        members,
        category,
        admin
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


export const addMemberToFamily = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { memberId } = req.body;

    const family = await Family.findById(id);

    if (!family) {
        return next(new Error("Family not found"));
    }

    if (family.members.includes(memberId)) {
        return next(new Error("Member already exists"));
    }

    family.members.push(memberId);

    await family.save();

    res.status(200).json({
        success: true,
        family,
        memberCount: family.members.length
    })
})