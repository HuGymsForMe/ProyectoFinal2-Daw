import Test from "../models/test.model.js";

// ******* CONTROLADOR DE MUESTRA DE TESTS (ADMIN) ******* //
export const getTests = async (req, res) => {
    try {
        const showTests = await Test.find();
        res.json(showTests);
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Se ha producido un error al mostrar todos los tests"});
    }
}