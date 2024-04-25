import Work from "../models/work.model.js";
import fs from "fs-extra";
import { uploadImage } from "../libs/cloudinary.js";

// ******* CONTROLADOR PARA QUE EL USUARIO SUBA SUS DATOS (PÁGINA DE TRABAJA CON NOSOTROS) ******* //
export const sendWork = async(req, res) => {
    //console.log(file); // Me da esto "{ '0': {} }"
    //const nameFile = "pepe"+file//A la BBDD solo subo el nombre del fichero
    // try {
    //     const newWork = new Work({
    //         name,
    //         surnames,
    //         email,
    //         telephone,
    //         file: nameFile,
    //     });

    //     const workSaved = await newWork.save();

    //     res.json({
    //         id: workSaved._id,
    //         name: workSaved.name,
    //         surnames: workSaved.surnames,
    //         email: workSaved.email,
    //         telephone: workSaved.telephone,
    //         file: workSaved.file,
    //     });
    // } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({ message: "No se ha podido enviar la información" });
    // }
};

// ******* CONTROLADOR PARA VISUALIZAR LAS DATOS DE TRABAJO ******* //
export const getWorks = async(req, res) => {
    try {
        const showWorks = await Work.find();
        res.json(showWorks);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "No se han podido visualizar los datos de trabajo de los usuarios con éxito."})
    }
}

// ******* CONTROLADOR PARA VISUALIZAR UN DATO DE TRABAJO POR SU ID ******* //
export const getWork = async(req, res) => {
    try {
        const showWork = await Work.findById(req.params.id);
        if(!showWork) return res.status(404).json({message: "Datos de trabajo no encontrados."})
        return res.json(showWork);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "No se ha podido visualizar los datos de trabajo por su ID."})
    }
}

// ******* CONTROLADOR PARA BORRAR UN DATO DE TRABAJO ******* //
export const deleteWork = async(req, res) => {
    try {
        const deletedWork = await Work.findByIdAndDelete(req.params.id);
        if(!deletedWork) return res.status(404).json({message: "Datos de trabajo no encontrados."});
        return res.json(deleteWork);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "No se han podido borrar los datos de trabajo con éxito."});
    }
}

// ******* CONTROLADOR PARA ACTUALIZAR UN DATO DE TRABAJO ******* //
export const updateWork = async(req, res) => {
    try {
        const {name, surnames, email, telephone, files} = req.body;
        const workUpdated = await Work.findByIdAndUpdate(
            {_id: req.params.id},
            {name, surnames, email, telephone, files},
            {new: true}
        )
        return res.json(workUpdated);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "No se ha podido actualizar el trabajo con éxito."})
    }
}