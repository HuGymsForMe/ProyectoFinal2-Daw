import { lazy, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { API } from "../config/config";

import { useSeo } from "../hooks/useSeo";

import LogoAutoescuelaFast from "../assets/logo.png";

const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));
const ToastErrors = lazy(() => import("../components/ToastErrors"));

function WorkPage() {

    useSeo({
        title: `Trabaja con Nosotros | AutoescuelaFast`,
        description: "Trabaja con nosotros, para ayudar a los más de 3000 alumnos diarios que visitan nuestra web."
    })

    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState(null);

    const {register, handleSubmit, reset} = useForm();

    const onSubmit = async (data) => {
        try {

            const formData = {
                name: data.name,
                surnames: data.surnames,
                email: data.email,
                telephone: data.telephone,
                age: data.age,
                contact: data.contact,
                moreInfo: data.moreInfo
            };
            
            setMessage("El formulario se envío correctamente");
            await axios.post(`${API}/work`, formData);
            reset();
        } catch (error) {
            console.log(error);
        }
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    // ******* PROP PARA EL TOAST ******* //
    const closeToast = () => {
        setShowToast(false);
    }

    return(    
        <>
        <Navbar />
        <main className="flex justify-center items-center flex-col min-h-screen">
        <section className="bg-white p-8 flex flex-col gap-y-8 rounded-xl shadow-slate-500 shadow-lg z-10 sm:w-auto w-[90%] my-16 xl:mt-32">
            <div className="flex gap-x-10 justify-center sm:flex-row flex-col items-center gap-y-4">
                <h1 className="text-3xl text-[#C21D30] text-center">Trabaja con Nosotros</h1>
                <img className="sm:w-48 w-40"  src={LogoAutoescuelaFast} alt="Autoescuela Fast" />
            </div>
            <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Su nombre" className="rounded-md p-2 bg-slate-200"
                    {...register("name", {required: true})} />
                </div>
                <div className="flex flex-col">
                    <label>Apellidos:</label>
                    <input type="text" placeholder="Sus apellidos" className="rounded-md p-2 bg-slate-200"
                    {...register("surnames", {required: true})} />
                </div>
                <div className="flex flex-col">
                    <label>Correo electrónico:</label>
                    <input type="email" placeholder="Su correo electrónico" className="rounded-md p-2 bg-slate-200"
                    {...register("email", {required: true})} />
                </div>
                <div className="flex flex-col">
                    <label>Teléfono Móvil:</label>
                    <input type="tel" placeholder="Su teléfono" className="rounded-md p-2 bg-slate-200"
                    {...register("telephone", {required: true})} />
                </div>
                <div className="flex flex-col">
                    <label>Edad:</label>
                    <input type="number" placeholder="Su edad" className="rounded-md p-2 bg-slate-200" min={0}
                    {...register("age", {required: false})} />
                </div>
                <div className="flex flex-col">
                    <label>Muéstrenos su perfil:</label>
                    <textarea type="tel" placeholder="Enlaces para ver su perfil..." className="rounded-md p-2 bg-slate-200 resize-none h-[200px]"
                    {...register("contact", {required: false})} />
                </div>
                <div className="flex flex-col">
                    <label>Más Información:</label>
                    <textarea type="tel" placeholder="Escríbanos sus dudas..." className="rounded-md p-2 bg-slate-200 resize-none h-[200px]"
                    {...register("moreInfo", {required: false})} />
                </div>
                <div className="flex justify-end">
                    <input type="submit" value="Enviar Información" onSubmit={handleSubmit(onSubmit)} className="bg-[#C21D30] text-white py-2 px-4 rounded-md cursor-pointer hover:shadow-xl hover:bg-[#B30519]" />
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

export default WorkPage;