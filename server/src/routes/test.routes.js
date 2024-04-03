import { Router } from "express";
import { deleteTest, getTest, getTests, sendTest, updateTest } from "../controllers/test.controller.js";

const router = Router();

router.get("/tests", getTests);
router.get("/tests/:id", getTest);
router.post("/tests", sendTest);
router.put("/tests/:id", updateTest);
router.delete("/tests/:id", deleteTest);

export default router;