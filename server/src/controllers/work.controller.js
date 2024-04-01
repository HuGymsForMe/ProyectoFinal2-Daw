import Work from "../models/work.model.js";
import fs from "fs-extra";
import { uploadImage } from "../libs/cloudinary.js";

// ******* CONTROLADOR PARA QUE EL USUARIO SUBA SUS DATOS (PÁGINA DE TRABAJA CON NOSOTROS) ******* //
export const sendWork = async (req, res) => {
    const { name, surnames, email, telephone, files } = req.body;
    try {
        const newWork = new Work({
            name,
            surnames,
            email,
            telephone,
            files,
        });

        const workSaved = await newWork.save();

        res.json({
            id: workSaved._id,
            name: workSaved.name,
            surnames: workSaved.surnames,
            email: workSaved.email,
            telephone: workSaved.telephone,
            files: workSaved.files,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "No se ha podido enviar la información" });
    }
};