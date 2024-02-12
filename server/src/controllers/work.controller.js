import Work from "../models/work.model.js";
import fs from "fs-extra";
import { uploadImage } from "../libs/cloudinary.js";

// ******* CONTROLADOR PARA QUE EL USUARIO SUBA SUS DATOS (PÁGINA DE TRABAJA CON NOSOTROS) ******* //
export const sendWork = async (req, res) => {
    try {
        const { name, surnames, email, telephone } = req.body;
        let files = [];

        if (req.files && req.files.file) {
            // Si estás usando multer para manejar la carga de archivos, req.files.file sería un array
            const filesArray = Array.isArray(req.files.file) ? req.files.file : [req.files.file];

            // Procesar cada archivo
            for (const file of filesArray) {
                const result = await uploadImage(file.tempFilePath);
                await fs.remove(file.tempFilePath);

                files.push({
                    url: result.secure_url,
                    public_id: result.public_id,
                });
            }
        }

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