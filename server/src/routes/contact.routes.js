import { Router } from "express";
import { getQuestions, sendQuestions } from "../controllers/contact.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { questionsSchema } from "../schemas/contact.schema.js";

// ******* ENRUTADO DEL ENVÍO DE PREGUNTAS A NUESTRA EMPRESA ******* //
const router = Router();

router.post("/contact", validateSchema(questionsSchema), sendQuestions);
router.get("/contact", getQuestions);

export default router;