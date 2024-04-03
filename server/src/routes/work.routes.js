import { Router } from "express";
import { deleteWork, getWork, getWorks, sendWork, updateWork } from "../controllers/work.controller.js";

// ******* ENRUTADO DE FORMULARIO DE TRABAJA CON NOSOTROS ******* //
const router = Router();

router.get("/work", getWorks);
router.post("/work", sendWork);
router.get("/work/:id", getWork);
router.put("/work/:id", updateWork);
router.delete("/work/:id", deleteWork);

export default router;