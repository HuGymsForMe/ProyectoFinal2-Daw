import { Router } from "express";
import { deleteQuestionTest, getOnlyQuestionTest, getQuestionTest, getQuestionsTest, sendQuestionTest, updateQuestionTest } from "../controllers/questiontest.controller.js";

const router = Router();

// ******* ENRUTADO DE LAS PREGUNTAS DE LOS TEST ******* //
router.get("/test", getQuestionsTest);
router.delete("/test/:id", deleteQuestionTest);
router.get("/testAdmin/:id", getOnlyQuestionTest); //He de diferenciar entre una sola pregunta o las preguntas de cada uno de los test
router.put("/test/:id", updateQuestionTest);
router.get("/test/:id", getQuestionTest);
router.post("/test", sendQuestionTest);

export default router;