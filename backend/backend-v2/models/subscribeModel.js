import mongoose from "mongoose";

const subscribeSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    }
})

const subscribeModel = mongoose.models.Subscribers || mongoose.model("Subscribers", subscribeSchema)

export default subscribeModel;