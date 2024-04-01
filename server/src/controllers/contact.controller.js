import Contact from "../models/contact.model.js";

// ******* CONTROLADOR DE ENVÍO DE POSIBLES DUDAS (PÁGINA DE CONTÁCTANOS) ******* //
export const sendQuestions = async(req, res) => {
    const { name, email, message } = req.body;
    try {
        const newQuestion = new Contact({
            name,
            email,
            message,
        })

        const questionSaved = await newQuestion.save();

        res.json({
            id: questionSaved._id,
            name: questionSaved.name,
            email: questionSaved.email,
            message: questionSaved.message,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Se ha producido un error durante el envío del formulario"});
    }
}

export const getQuestions = async(req, res) => {
    try {                                                                              
        const showQuestions = await Contact.find();
        res.json(showQuestions);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Se ha producido un error al mostrar las preguntas y respuestas de los usuarios"});
    }
}

export const deleteQuestion = async(req,res) => {
    try {
        const deletedQuestion = await Contact.findByIdAndDelete(req.params.id);
        if(!deletedQuestion) return res.status(404).json({message: "Pregunta de contacto no encontrada"});
        return res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: "Se produjo un error al intentar borrar la pregunta"})
    }
}

export const updateQuestion = async(req, res) => {
    try {
        const {name, email, message} = req.body;
        const questionUpdated = await Contact.findOneAndUpdate(
            {_id: req.params.id},
            {name, email, message},
            {new: true}
        );
        return res.json(questionUpdated);
    } catch (error) {
        return res.status(500).json({ message: "No se pudo editar la pregunta de contacto"});
    }
}

export const getQuestion = async(req,res) => {
    try {
        const question = await Contact.findById(req.params.id);
        if(!question) return res.status(404).json({ message: "Pregunta de contacto no encontrada"});
        return res.json(question);
    } catch (error) {
        return res.status(500).json({message: "Se produjo un error al buscar esta pregunta de contacto por su ID"})
    }
}
