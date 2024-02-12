import { getNews, sendNew } from "../controllers/news.controller.js";
import { Router } from "express";

const router = Router();

router.get("/news", getNews);
router.post("/news", sendNew);

export default router;