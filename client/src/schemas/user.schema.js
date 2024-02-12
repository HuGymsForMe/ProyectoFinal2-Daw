import {z} from 'zod';

// ******* REQUERIMIENTOS DE DATOS DE LOS USUARIOS ******* //

export const registerSchema = z.object({
    name: z.string({
        required_error: "El nombre es obligatorio"
    }),
    surnames: z.string({
        required_error: "Los apellidos son obligatorios"
    }),
    username: z.string({
        required_error: "El nombre de usuario es obligatorio"
    }).min(6, {
        message: "El nombre de usuario debe tener entre 6 y 14 caracteres",
    }).max(14, {
        message: "El nombre de usuario debe tener entre 6 y 14 caracteres",
    }),
    email: z.string({
        required_error: "El email es obligatorio"
    }).email({
        message: "Email inválido",
    }),
    password: z.string({
        required_error: "La contraseña es obligatoria"
    }).min(6, {
        message: "La contraseña debe tener entre 6 y 18 caracteres",
    }).max(18, {
        message: "La contraseña debe tener entre 6 y 18 caracteres",
    }),
    confirm_password: z.string({
        required_error: "La contraseña es obligatoria"
    }).min(6, {
        message: "La contraseña debe tener entre 6 y 18 caracteres",
    }).max(18, {
        message: "La contraseña debe tener entre 6 y 18 caracteres",
    }),
    birthday : z.string({
        required_error: "La fecha de nacimiento es requerida"
    })
})

export const loginSchema = z.object({
    username: z.string({
        required_error: "El email es obligatorio"
    }),
    password: z.string({
        required_error: "La contraseña es obligatoria"
    }).min(6, {
        message: "La contraseña debe tener entre 6 y 18 caracteres",
    }).max(18, {
        message: "La contraseña debe tener entre 6 y 18 caracteres",
    }),
});