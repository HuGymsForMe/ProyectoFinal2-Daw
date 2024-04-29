import { Router } from "express";
import { register, login, getUsers, getUser, updateUser, deleteUser, updatePremiumUser } from "../controllers/user.controller.js";
import { registerSchema, loginSchema } from "../schemas/user.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

// ******* ENRUTADO DE LOS USUARIOS DE LA APLICACIÓN ******* //
const router = Router();

router.post("/register", validateSchema(registerSchema), register); //Hace también de sendUser
router.post("/login", validateSchema(loginSchema), login);
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.put("/userspremium/:id", updatePremiumUser);

export default router;