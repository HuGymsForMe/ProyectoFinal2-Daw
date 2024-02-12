import {z} from 'zod';

// ******* REQUERIMIENTOS DE LOS ENVÍOS DE PREGUNTAS ******* //

export const questionsSchema = z.object({
    name: z.string({
        required_error: "El nombre es obligatorio"
    }),
    email: z.string({
        required_error: "El correo es obligatorio"
    }).email({
        message: "Email inválido"
    }),
    message: z.string({
        required_error: "Rellene el mensaje con posibles dudas que le podamos resolver"
    }),
})