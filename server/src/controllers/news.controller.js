import New from "../models/news.model.js";

// ******* CONTROLADOR DE MOSTRAR NOTICIAS DE NUESTRA AUTOESCUELA (PÁGINA DE NOTICIAS) ******* //
export const getNews = async(req,res) => {
    try {
        const showNews = await New.find();
        res.json(showNews);
    } catch (error) {
        res.status(500).json({message: "Se ha producido un error al mostrar las noticias de nuestra autoescuela"});
    }
}

// ******* CONTROLADOR DE SUBIR NOTICIAS A NUESTRA ESCUELA (PANEL DE ADMINISTRADOR) ******* //
export const sendNew = async(req,res) => {
    const { title, subtitle, image, date_publication, content } = req.body;
    try {
        const newItem = new New({
            title,
            subtitle,
            image,
            date_publication,
            content,
        })

        const newSaved = await newItem.save();

        res.json({
            id: newSaved._id,
            title: newSaved.title,
            subtitle: newSaved.subtitle,
            date_publication: newSaved.date_publication,
            content: newSaved.content,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "No se ha podido introducir la noticia correctamente" })
    }
}