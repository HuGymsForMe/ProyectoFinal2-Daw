import { Router } from "express";
import { getQuestionTest } from "../controllers/questiontest.controller.js";

const router = Router();

router.get("/test/:id", getQuestionTest);

export default router;