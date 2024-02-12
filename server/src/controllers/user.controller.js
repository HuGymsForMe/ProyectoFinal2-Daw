import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

// ******* CONTROLADOR DE REGISTRO (PÁGINA DE REGISTRO) ******* //
export const register = async (req, res) => {
    const { name, surnames, username, email, password, birthday, premium_user } = req.body;
    try {
        const userFoundbyEmail = await User.findOne({email});
        const userFoundbyUsername = await User.findOne({username});
        if (userFoundbyEmail) return res.status(400).json({message: "El email ya está en uso"});
        if (userFoundbyUsername) return res.status(400).json({message: "El nombre de usuario ya está en uso"});

        const passwordHash = await bcryptjs.hash(password, 10);

        const newUsuario = new User({
            name,
            surnames,
            username,
            email,
            password: passwordHash,
            birthday,
            premium_user,
        });

        const userSaved = await newUsuario.save();
        const token = await createAccessToken({id: userSaved._id});
        
        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        });

        res.json({
            id: userSaved._id,
            name: userSaved.name,
            surnames: userSaved.surnames,
            username: userSaved.username,
            email: userSaved.email,
            password: userSaved.password,
            birthday: userSaved.birthday,
            premium_user: userSaved.premium_user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "No se ha podido registrar el usuario" });
    }
}

// ******* CONTROLADOR DE 'LOGEO' (PÁGINA LOGIN) ******* //
export const login = async(req, res) => {
    const { username, password } = req.body;
    try {

        const userFound = await User.findOne({username});
        if(!userFound) return res.status(400).json({message: "El nombre de usuario no existe"});

        const isMatch = await bcryptjs.compare(password, userFound.password);
        if(!isMatch) return res.status(400).json({message: "Contraseña incorrecta"});

        const token = await createAccessToken({
            id: userFound._id,
            username: userFound.username,
        });

        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        });

        res.json({
            id: userFound._id,
            name: userFound.name,
            surnames: userFound.surnames,
            username: userFound.username,
            email: userFound.email,
            password: userFound.password,
            birthday: userFound.birthday,
            premium_user: userFound.premium_user,
            create_account: userFound.createdAt,
        });
        
    } catch (error) {
        res.status(500).json({ message: "Se ha producido un error" });
    }
}

// ******* CONTROLADOR DE CERRAR SESIÓN (PÁGINA DE MI PERFIL) ******* //
export const logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
    })

    return res.sendStatus(200);
}