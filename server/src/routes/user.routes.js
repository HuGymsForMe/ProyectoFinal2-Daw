import { Router } from "express";
import { register, login, getUsers } from "../controllers/user.controller.js";
import { registerSchema, loginSchema } from "../schemas/user.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

// ******* ENRUTADO DE LOS USUARIOS DE LA APLICACIÓN ******* //
const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/users", getUsers);

export default router;