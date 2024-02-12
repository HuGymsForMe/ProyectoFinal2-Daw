import mongoose from "mongoose";

// ******* ESQUEMA DE LAS NOTICIAS DE AUTOESCUELA FAST ******* //
const newsSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    subtitle : {
        type : String,
        required: true
    },
    image : {
        type: String,
        required: true,
    },
    date_publication : {
        type: String,
        required: true,
    },
    content : { //Cada elemento del array es un párrafo de la noticia
        type: Array,
    }
})

export default mongoose.model("New", newsSchema);