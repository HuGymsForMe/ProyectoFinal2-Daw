import mongoose from "mongoose";

const workSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    surnames: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    telephone: {
        type: Number,
        required: true,
    },
    files: {
        type: Array,
        required: false,
    }
},  {
    timestamps: true,
})

export default mongoose.model("Work", workSchema);