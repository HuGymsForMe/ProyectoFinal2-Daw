import { sendQuestions } from "../controllers/contact.controller";
import Contact from "../models/contact.model";

//Generamos una petición de ejemplo
const req = {
    body: {
        name: "John Doe",
        email: "john@example.com",
        message: "Hi, my name is John Doe",
    }
}

//Simulamos el objeto de respuesta
const res = {
    json: jest.fn().mockReturnValue({}),
    status: jest.fn().mockReturnThis(),
}

jest.mock("../models/contact.model", () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(data => data),
}))


describe('sendQuestions', () => {
    it('should send a question and return saved data', async () => {
        // Ejecutar la función
        await sendQuestions(req, res);

        // Verificar que la función save de Contact fue llamada con los datos correctos
        expect(Contact).toHaveBeenCalledWith({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
        });

        // Verificar que la función json de res fue llamada con los datos correctos
        expect(res.json).toHaveBeenCalledWith({
            id: expect.any(String), // Esperamos que se genere un ID (tipo String)
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
        });
    });

    it('should return 500 status and an error message if an error occurs', async () => {
        // Mockear la función save de Contact para simular un error
        Contact.mockImplementationOnce(() => {
            throw new Error('Test error');
        });

        // Ejecutar la función
        await sendQuestions(req, res);

        // Verificar que se llamó a la función status con el código 500
        expect(res.status).toHaveBeenCalledWith(500);

        // Verificar que la función json de res fue llamada con un mensaje de error
        expect(res.json).toHaveBeenCalledWith({ message: 'Se ha producido un error durante el envío del formulario' });
    });
});