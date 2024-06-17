import { ObjectId } from "mongoose";

export interface IUserFamilGroups{
    familyID: ObjectId,
    name: string,
    description: string,
    category: string,
    familyRole: string
}