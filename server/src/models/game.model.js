import mongoose from "mongoose";

// ******* ESQUEMA DE LAS PARTIDAS DE LOS USUARIOS ******* //
const gameSchema = new mongoose.Schema({
    time: {
        type: Number,
        required: true,
    },
    misses: {
        type: Number,
        required: true,
    },
    successes: {
        type: Number,
        required: true,
    },
    pass: {
        type: Boolean,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
        required: true,
    },
}, {
    timestamps: true,
})

export default mongoose.model("Game", gameSchema);