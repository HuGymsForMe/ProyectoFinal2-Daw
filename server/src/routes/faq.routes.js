import { Router } from "express";
import { deleteFaQ, getFaQ, getFaQs, sendFaQ, updateFaQ } from "../controllers/faq.controller.js";

const router = Router();

// ******* ENRUTADO DE LAS FaQ's DE LOS USUARIOS ******* //
router.get("/faqs", getFaQs);
router.get("/faqs/:id", getFaQ);
router.delete("/faqs/:id", deleteFaQ);
router.put("/faqs/:id", updateFaQ);
router.post("/faqs", sendFaQ);

export default router;