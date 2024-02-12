import mongoose from "mongoose";

// ******* ESQUEMA DE LAS PREGUNTAS DE LOS TEST TEÓRICOS ******* //

const questionTestSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    question: {
        type: String,
        required: true,
    },
    first_answer: {
        type: String,
        required: true,
    },
    second_answer: {
        type: String,
        required: true,
    },
    third_answer: {
        type: String,
        required: true
    },
    correct_answer: {
        type: String,
        required: true,
    },
    test : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
        required: true,
    }
})

export default mongoose.model("QuestionTest", questionTestSchema);