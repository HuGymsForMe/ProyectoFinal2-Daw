import { Router } from "express";
import { getFaQs } from "../controllers/faq.controller.js";

const router = Router();

router.get("/", getFaQs);

export default router;