import { useState, lazy } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { useSeo } from "../hooks/useSeo";

import LogoAutoescuelaFast from "../assets/logo.png";

import { API } from "../config/config";

import { questionsSchema } from "../schemas/contact.schema";

const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));
const ToastErrors = lazy(() => import("../components/ToastErrors"));

// ******* PÁGINA DE CONTACTO ******* //
function ContactPage(){

    useSeo({
        title: "Contacto | AutoescuelaFast",
        description: "Envianos todas tus dudas en nuestro apartado de Contacto. Te intentaremos responder con la máxima rapidez y eficacia posible."
    })

    const [showToast, setShowToast] = useState(false); //Para mostrar un toast al usuario de información del envío
    const [message, setMessage] = useState(null);

    const { register, handleSubmit, reset, formState: { errors }} = useForm({
        resolver: zodResolver(questionsSchema),
    });

    const onSubmit = async (data) => {
        try {
            await axios.post(`${API}/contact`, {
                name: data.name, 
                email: data.email, 
                message: data.message
            });
            setMessage("El mensaje se envió correctamente.");
            reset();
        } catch (error) {
            console.log(error);
        }
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    }
    

    // ******* PROP PARA EL TOAST ******* //
    const closeToast = () => {
        setShowToast(false);
    }

    return(
        <>
        <Navbar />
        <main className="flex justify-center items-center min-h-screen">
            <section className="bg-white p-8 flex flex-col gap-y-8 rounded-xl shadow-slate-500 shadow-lg z-10 sm:w-auto w-[90%] md:my-auto my-16">
                <div className="flex gap-x-10 justify-center sm:flex-row flex-col items-center gap-y-4">
                    <h1 className="text-4xl text-[#C21D30]">Contáctanos</h1>
                    <img className="sm:w-56 w-40"  src={LogoAutoescuelaFast} alt="Autoescuela Fast" />
                </div>
                <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col">
                        <label>Nombre:</label>
                        <input type="text" placeholder="Su nombre" className="rounded-md p-2 bg-slate-200"
                        {...register("name", {required: true})} />
                        {errors.name?.message && (
                            <p className="text-red-500 text-sm w-[90%] mt-2">{errors.name?.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <div className="flex sm:justify-between sm:flex-row flex-col">
                            <label>Correo:</label>
                            <p className="text-xs italic">* Para poder contactar con usted *</p>
                        </div>
                        <input type="email" placeholder="Su correo" className="rounded-md p-2 bg-slate-200"
                        {...register("email", {required: true})} />
                        {errors.email?.message && (
                            <p className="text-red-500 text-sm w-[90%] mt-2">{errors.email?.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label>Mensaje:</label>
                        <textarea cols="30" rows="10" placeholder="Escriba aquí sus dudas" className="rounded-md p-2 bg-slate-200 max-h-[200px] min-h-[200px]"
                        {...register("message", {required: true})}></textarea>
                        {errors.message?.message && (
                            <p className="text-red-500 text-sm w-[90%] mt-2">{errors.message?.message}</p>
                        )}
                    </div>
                    <div className="flex justify-end mt-4">
                        <button type="submit" className="bg-[#C21D30] border-2 border-[#999] text-white py-2 px-4 rounded-md cursor-pointer hover:shadow-xl hover:bg-[#B30519]">Enviar Dudas</button>
                    </div>
                </form>
            </section>
                {showToast && message && (<ToastErrors onClose={closeToast} error={false}>Se produjo el envío correctamente</ToastErrors>)}
                {showToast && !message && (<ToastErrors onClose={closeToast} error={true}>No se pudo hacer el envío correctamente</ToastErrors>)}
        </main>
        <Footer />
        </>
    )
}

export default ContactPage;