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

