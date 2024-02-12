import mongoose from "mongoose";


// ******* ESQUEMA DEL INPUT DE 'CONTÁCTANOS' (PÁGINA DE CONTACTO) ******* //
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    }, 
},  {
    timestamps: true,
})

export default mongoose.model("Contact", contactSchema);
