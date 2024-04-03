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

// ******* CONTROLADOR UNA FaQ DEL SISTEMA MEDIANTE SU ID ******* //
export const getFaQ = async(req, res) => {
    try {
        const showFaQ = await FaQ.findById(req.params.id);
        if(!showFaQ) return res.status(404).json({ message: "FaQ no encontrada"});
        return res.json(showFaQ);
    } catch (error) {
        return res.status(500).json({message: "Se produjo un error al buscar este FaQ por su ID"})
    }
}

// ******* CONTROLADOR PARA BORRAR LAS FaQs DEL SISTEMA ******* //
export const deleteFaQ = async(req, res) => {
    try {
        const deletedFaQ = await FaQ.findByIdAndDelete(req.params.id);
        if(!deletedFaQ) return res.status(404).json({message: "FaQ no encontrada"});
        return res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: "Se produjo un error al intentar borrar la FaQ"})
    }
}

// ******* CONTROLADOR PARA ACTUALIZAR LAS FaQs DEL SISTEMA ******* //
export const updateFaQ = async(req, res) => {
    try {
        const {question, answer} = req.body;
        const faqUpdated = await FaQ.findOneAndUpdate(
            {_id: req.params.id},
            {question, answer},
            {new: true}
        );
        return res.json(faqUpdated);
    } catch (error) {
        return res.status(500).json({ message: "No se pudo editar la FaQ"});
    }
}

// ******* CONTROLADOR PARA ENVIAR UNA FaQ AL SISTEMA
export const sendFaQ = async(req, res) => {
    try {
        const { question, answer } = req.body;
        const newFaQ = new FaQ({
            question,
            answer
        })

        const faqSaved = await newFaQ.save();

        res.json({
            id: faqSaved._id,
            question: faqSaved.question,
            answer: faqSaved.answer,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Se ha producido un error durante el envío del FaQ"});
    }
}