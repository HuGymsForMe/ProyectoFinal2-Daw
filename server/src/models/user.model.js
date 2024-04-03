import mongoose from "mongoose";

// ******* ESQUEMA DE LOS USUARIOS DE LA APLICACIÓN ******* //
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    surnames: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email : {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
    },
    premium_user: {
        type: Boolean,
        default: false,
    },
    admin: {
        type: Boolean,
        default: false,
    }
},  {
    timestamps: true,
})

export default mongoose.model("User", userSchema);