import mongoose from "mongoose";
import { Iuser } from "../types/types";


mongoose.set('bufferCommands', false);

const schema = new mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true },
    password:{ type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    age: {type : Number  },
    verificationCode: { type: String },
    avatar:{type:String},
})

const User = mongoose.models.Users || mongoose.model<Iuser>("Users", schema);

export default User;