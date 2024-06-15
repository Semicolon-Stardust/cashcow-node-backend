import mongoose from "mongoose";
import { IFamily } from "../interfaces/schemaInterfaces.js";

const familySchema = new mongoose.Schema<IFamily>({
    name: {
        type: String,
        required: [true, "Please enter family name"],
        unique: true
    },
    description: {
        type: String,
    },
    members: {
        type: [mongoose.Schema.Types.ObjectId],
        required: [true, "Please enter family members"],
    },
    category: {
        type: String,
        required: [true, "Please select category for this family"],
    },
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const familyGroup =  mongoose.model("Family", familySchema);
export default familyGroup;
