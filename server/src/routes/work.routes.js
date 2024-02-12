import { Router } from "express";
import { sendWork } from "../controllers/work.controller.js";

// ******* ENRUTADO DE FORMULARIO DE TRABAJA CON NOSOTROS ******* //
const router = Router();

router.post("/work", sendWork);

export default router;