import mongoose from "mongoose";

// ******* ESQUEMA DE LOS DESPLEGABLES DE LAS PREGUNTAS DE LA COMUNIDAD ******* //

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true
    },
})

export default mongoose.model('FAQ', faqSchema);