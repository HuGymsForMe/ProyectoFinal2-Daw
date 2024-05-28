import { Router } from "express";
import { register, login, getUsers, getUser, updateUser, deleteUser, updatePremiumUser, sendVerificationEmail } from "../controllers/user.controller.js";
import { registerSchema, loginSchema } from "../schemas/user.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();

// ******* ENRUTADO DE LOS USUARIOS DE LA APLICACIÓN ******* //
router.post("/register", validateSchema(registerSchema), register); //Hace también de sendUser
router.post("/login", validateSchema(loginSchema), login);
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.put("/userspremium/:id", updatePremiumUser);
router.put("/usersemail", sendVerificationEmail);

export default router;