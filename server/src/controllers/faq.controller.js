import FaQ from "../models/faq.model.js";

// ******* CONTROLADOR DE MUESTRA DE FaQs (PÁGINA DE INICIO) ******* //
export const getFaQs = async (req, res) => {
    try {
        const showFaQs = await FaQ.find();
        res.json(showFaQs);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Se ha producido un error al mostrar las preguntas y respuestas más solicitadas por los usuarios"});
    }
}