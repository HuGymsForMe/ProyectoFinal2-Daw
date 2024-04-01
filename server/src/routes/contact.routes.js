import { Router } from "express";
import { deleteQuestion, getQuestion, getQuestions, sendQuestions, updateQuestion } from "../controllers/contact.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { questionsSchema } from "../schemas/contact.schema.js";

// ******* ENRUTADO DEL ENVÍO DE PREGUNTAS A NUESTRA EMPRESA ******* //
const router = Router();

router.post("/contact", validateSchema(questionsSchema), sendQuestions);
router.get("/contact", getQuestions);
router.get("/contact/:id", getQuestion);
router.delete("/contact/:id", deleteQuestion);
router.put("/contact/:id", updateQuestion);

export default router;