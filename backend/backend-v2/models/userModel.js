import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    cartData:{
        type: Object,
        default: {},    
    },
    date:{
        type: Date,
        default: Date.now,
    }
}, {minimize: false})

const userModel = mongoose.models.Users || mongoose.model("Users", userSchema)

export default userModel;