import Test from "../models/test.model.js";

// ******* CONTROLADOR DE MUESTRA DE TESTS ******* //
export const getTests = async (req, res) => {
    try {
        const showTests = await Test.find();
        res.json(showTests);
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Se ha producido un error al mostrar todos los tests"});
    }
}

// ******* CONTROLADOR PARA VISUALIZAR UN TEST CONCRETO MEDIANTE SU ID ******* //
export const getTest = async(req, res) => {
    try {
        const showTest = await Test.findById(req.params.id);
        if(!showTest) return res.status(404).json({message: "Test no encontrada"});
        return res.json(showTest);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Se ha producido un error al visualizar el test solicitado."})
    }
}

// ******* CONTROLADOR PARA BORRAR UN TEST ******* //
export const deleteTest = async(req, res) => {
    try {
        const deletedTest = await Test.findByIdAndDelete(req.params.id);
        if(!deletedTest) return res.status(404).json({message: "Test no encontrado."})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Se ha producido un error al intentar borrar el test."})
    }
}

// ******* CONTROLADOR PARA ACTUALIZAR UN TEST ******* //
export const updateTest = async(req, res) => {
    try {
        const {number_test} = req.body;
        const testUpdated = await Test.findByIdAndUpdate(
            {_id: req.params.id},
            {number_test},
            {new: true}
        )
        return res.json(testUpdated);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Se ha producido un error al intentar borrar el test"})
    }
}

// ******* CONTROLADOR PARA AÑADIR UN NUEVO TEST ******* //
export const sendTest = async(req,res) => {
    const { number_test } = req.body;
    try {
        const newTest = new Test ({
            number_test
        }) 

        const testSaved = await newTest.save();

        res.json({
            id: testSaved._id,
            number_test: testSaved.number_test,
        });
        
    } catch (error) {
        res.status(500).json({message: "Se ha producido un error al guardar el nuevo test."});
    }
}