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

// ******* CONTROLADOR PARA VISUALIZAR TODAS LAS PREGUNTAS DE LOS TEST ******* //
export const getQuestionsTest = async(req, res) => {
    try {
        const showQuestionsTest = await QuestionTest.find();
        res.json(showQuestionsTest);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Se ha producido un error al visualizar todas las preguntas de los test."})
    }
}

// ******* CONTROLADOR PARA VISUALIZAR UNA PREGUNTAS DE LOS TEST MEDIANTE UN ID ******* //
export const getOnlyQuestionTest = async(req, res) => {
    try {
        const showQuestionTest = await QuestionTest.findById(req.params.id);
        if(!showQuestionTest) return res.status(404).json({message: "Pregunta no encontrada."})
        return res.json(showQuestionTest);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Se ha producido un error al visualizar la pregunta solicitada."})
    }
}

// ******* CONTROLADOR PARA BORRAR UNA PREGUNTA ******* //
export const deleteQuestionTest = async(req, res) => {
    try {
        const deletedQuestionTest = await QuestionTest.findByIdAndDelete(req.params.id);
        if(!deletedQuestionTest) return res.status(404).json({message: "Pregunta no encontrada."})
        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Debido a un error, no se ha podido borrar la pregunta."})
    }
}

// ******* CONTROLADOR PARA ACTUALIZAR UNA PREGUNTA ******* //
export const updateQuestionTest = async(req, res) => {
    try {
        const {image, question, first_answer, second_answer, third_answer, correct_answer, test} = req.body;
        const questionTestUpdated = await QuestionTest.findByIdAndUpdate(
            {_id: req.params.id},
            {image, question, first_answer, second_answer, third_answer, correct_answer, test},
            {new: true}
        )
        return res.json(questionTestUpdated);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Debido a un error, no se ha podido actualizar la pregunta."});
    }
}

// ******* CONTROLADOR PARA SUBIR UNA NUEVA PREGUNTA DE UN TEST ******* //
export const sendQuestionTest = async(req,res) => {
    const {image, question, first_answer, second_answer, third_answer, correct_answer, test} = req.body;
    try {
        const newQuestionTest = new QuestionTest ({
            image,
            question,
            first_answer,
            second_answer,
            third_answer,
            correct_answer,
            test
        }) 

        const testQuestionSaved = await newQuestionTest.save();

        res.json({
            id: testQuestionSaved._id,
            image: testQuestionSaved.image,
            first_answer: testQuestionSaved.first_answer,
            second_answer: testQuestionSaved.second_answer,
            third_answer: testQuestionSaved.third_answer,
            correct_answer: testQuestionSaved.correct_answer,
            test: testQuestionSaved.test,
        });
        
    } catch (error) {
        res.status(500).json({message: "Se ha producido un error al guardar el nuevo test."});
    }
}