import { Router } from "express";
import { getTests } from "../controllers/test.controller.js";

const router = Router();

router.get("/tests/:id", getTests);

export default router;