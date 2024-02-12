import QuestionTest from "../models/questiontest.model.js";

// ******* CONTROLADOR DE MUESTRA DE LAS PREGUNTAS DE LOS TEST (PÁGINA DE UN TEST CONCRETO) ******* //
export const getQuestionTest = async (req, res) => {
    try {
        const idTest = req.params.id;
        const showQuestionsTest = await QuestionTest.find({ test: idTest });
        res.json(showQuestionsTest)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Se ha producido un error ya que no existe dicho test"});
    }
}