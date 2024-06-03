import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import nodemailer from "nodemailer";

// ******* CONTROLADOR DE REGISTRO (PÁGINA DE REGISTRO) ******* //
export const register = async (req, res) => {
    const { name, surnames, username, email, password, birthday, premium_user } = req.body;
    try {
        const userFoundbyEmail = await User.findOne({email});
        const userFoundbyUsername = await User.findOne({username});
        if (userFoundbyEmail) return res.status(400).json({message: "El email ya está en uso"});
        if (userFoundbyUsername) return res.status(400).json({message: "El nombre de usuario ya está en uso"});

        const passwordHash = await bcryptjs.hash(password, 10);

        const newUser = new User({
            name,
            surnames,
            username,
            email,
            password: passwordHash,
            birthday,
            premium_user
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({id: userSaved._id, username: userSaved.username});
        
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

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "hugodiazcasado31@gmail.com",
                pass: "aksnhofyiosiuxes"
            }
        });
    
        let mailOptions = {
            from: "hugodiazcasado31@gmail.com",
            to: email,
            subject: "Bienvenido a Autoescuela Fast",
            html:   `<div> 
                        <img src="https://autoescuela-fast.vercel.app/assets/logo-B98mQ9TH.png" alt="Logo Autoescuela Fast" />
                        <p>Estamos encantados de que hayas confiado en nosotros para poder sacar tu éxamen teórico adelante.</p>
                        <p>Ojalá estar con nosotros sea una experiencia inolvidable y un gran aprendizaje para ti!</p>
                    </div>`
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "No se ha podido enviar el correo de verificación para poder modificar la contraseña." });
            }
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
        console.log(error);
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

// ******* CONTROLADOR PARA VISUALIZAR TODOS LOS USUARIOS DEL SISTEMA ******* //
export const getUsers = async(req, res) => {
    try {
        const showUsers = await User.find();
        res.json(showUsers);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "No se han podido visualizar los usuarios del sistema"})
    }
}

// ******* CONTROLADOR PARA VISUALIZAR UN USUARIO POR SU ID ******* //
export const getUser = async(req, res) => {
    try {
        const showUser = await User.findById(req.params.id);
        if (!showUser) return res.status(404).json({message: "Usuario no encontrado."})
        return res.json(showUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "No se ha podido visualizar el usuario solicitado."})
    }
}

// ******* CONTROLADOR PARA BORRAR UN USUARIO DEL SISTEMA ******* //
export const deleteUser = async(req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(!deletedUser) return res.status(404).json({message: "Usuario no encontrado"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "No se ha podido borrar el usuario solicitado con éxito."})
    }
}

// ******* CONTROLADOR PARA ACTUALIZAR UN USUARIO DEL SISTEMA ******* //
export const updateUser = async(req, res) => {
    try {
        const {name, surnames, username, email, password, birthday, premium_user} = req.body;
        const passwordHash = await bcryptjs.hash(password, 10);
        const userUpdated = await User.findByIdAndUpdate(
            {_id: req.params.id},
            {name, surnames, username, email, password: passwordHash, birthday, premium_user},
            {new: true}
        )
        return res.json(userUpdated);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "No se ha podido actualizar el usuario con éxito."})
    }
}

// ******* CONTROLADOR PARA ACTUALIZAR EL USUARIO A PREMIUM ******* //
export const updatePremiumUser = async(req,res) => {
    try {
        const {premium_user} = req.body;
        const userUpdated = await User.findByIdAndUpdate(
            {_id: req.params.id},
            {premium_user},
            {new: true}
        )
        return res.json(userUpdated);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "No se ha podido actualizar el usuario a premium con éxito."})
    }
}

// ******* CONTROLADOR PARA ACTUALIZAR LA CONTRASEÑA Y ENVIAR UN CORREO ******* //
export const sendVerificationEmail = async(req,res) => {

    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
    
        let newPassword = "";
        let caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 10; i++) {
            newPassword += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
    
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "hugodiazcasado31@gmail.com",
                pass: "aksnhofyiosiuxes"
            }
        });
    
        let mailOptions = {
            from: "hugodiazcasado31@gmail.com",
            to: email,
            subject: "Cambio de Contraseña Autoescuela Fast",
            html:   `<div> 
                        <img src="https://autoescuela-fast.vercel.app/assets/logo-B98mQ9TH.png" alt="Logo Autoescuela Fast" />
                        <p>Aquí te enviamos la nueva contraseña, la cuál podrás modificar posteriormente al acceder a "Mi perfil". Esta es tu nueva contraseña: <strong>${newPassword}</strong></p>
                    </div>`
        };
    
        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "No se ha podido enviar el correo de verificación para poder modificar la contraseña." });
            } else {
                const passwordHash = await bcryptjs.hash(newPassword, 10);
                const userUpdated = await User.findOneAndUpdate(
                    { email },
                    { password: passwordHash },
                    { new: true }
                );
                return res.json(userUpdated);
            }
        });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}