import { useEffect, useState, lazy } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSeo } from "../hooks/useSeo";

import { useAuth } from "../context/UserContext";

import { registerSchema } from "../schemas/user.schema";

const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));
const ToastErrors = lazy(() => import("../components/ToastErrors"));

import LogoAutoescuelaFast from "../assets/logo.png";

// ******* PÁGINA DE REGISTRO DE USUARIOS ******* //
function RegisterPage() {

    useSeo({
        title: "Register | AutoescuelaFast",
        description: "Bienvenido a Autoescuela Fast registrate para hacer innumerables tests y aprender con nuestros profesores."
    })

    const [seePassword, setSeePassword] = useState(false);
    const [seePasswordConfirm, setSeePasswordConfirm] = useState(false);
    const [passwordsEquals, setPasswordEquals] = useState(true); //Comprueba si coinciden las contraseñas
    const [errorHTTP, setErrorHTTP] = useState(false); //Comprueba si hay errores a la hora de hacer peticiones HTTP
    const [showToast, setShowToast] = useState(false); //Hace desaparecer y aparecer el toast

    const { register,handleSubmit,formState: { errors } } = useForm({resolver: zodResolver(registerSchema)});

    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    // ******* VISUALIZAR CONTRASEÑAS *******//
    const toggleSeePassword = () => {
        setSeePassword(!seePassword);
    };

    const toggleSeePasswordConfirm = () => {
        setSeePasswordConfirm(!seePasswordConfirm);
    };

    // ******* PROP PARA EL TOAST ******* //
    const closeToast = () => {
        setShowToast(false);
    }

    // ******* INICIO DE SESIÓN DEL USUARIO AL RELLENAR EL FORMULARIO CORRECTAMENTE ******* //
    useEffect(() => {
        if (isAuthenticated) navigate("/");
    }, [isAuthenticated])
    
    const onSubmit = async (data) => {
        if (data.password !== data.confirm_password) {
            setPasswordEquals(false);
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return;
        }
        // ******** POSIBLE RESPUESTA 400 ******* //
        if(!await signup(data)){
            setErrorHTTP(true);
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return;
        }
    }
    

    return (
        <>
        <Navbar />
        <main className="flex justify-center items-center h-screen">
            <section className="bg-white p-8 flex flex-col gap-y-8 rounded-xl shadow-slate-500 shadow-lg z-10 sm:w-auto w-[90%] md:mt-0 my-64">
                <div className="flex gap-x-10 gap-y-4 md:flex-row flex-col justify-center items-center">
                    <h1 className={`text-4xl text-[#C21D30]`}>Regístrate</h1>
                    <img className="sm:w-56 w-40" src={LogoAutoescuelaFast} alt="Logo AutoescuelaFast" />
                </div>
                <form className="flex flex-col gap-x-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col md:flex-row">
                        <div className="flex flex-col gap-y-4 m-2">
                            <div className="flex flex-col">
                                <label className="text-xl">Nombre:</label>
                                <input type="text" placeholder="Nombre" className="rounded-md p-2 bg-slate-200" 
                                    {...register("name", { required: true })} />
                                {errors.name?.message && (
                                    <p className="text-red-500 text-sm w-[90%] mt-2">{errors.name?.message}</p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xl">Apellidos:</label>
                                <input type="text" placeholder="Apellidos" className="rounded-md p-2 bg-slate-200"
                                    {...register("surnames", { required: true })} />
                                {errors.surnames?.message && (
                                    <p className="text-red-500 text-sm w-[90%] mt-2">{errors.surnames?.message}</p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xl">Nombre de usuario:</label>
                                <input type="text" placeholder="Nombre de usuario" className="rounded-md p-2 bg-slate-200"
                                    {...register("username", { required: true })} />
                                {errors.username?.message && (
                                    <p className="text-red-500 text-sm w-[90%] mt-2">{errors.username?.message}</p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xl">Correo Electrónico:</label>
                                <input type="text" placeholder="Correo Electrónico" className="rounded-md p-2 bg-slate-200"
                                    {...register("email", { required: true })} />
                                {errors.email?.message && (
                                    <p className="text-red-500 text-sm w-[90%] mt-2">{errors.email?.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-4 m-2">
                            <div className="flex flex-col">
                                <label className="text-xl">Contraseña:</label>
                                <input type={seePassword ? "text" : "password"} placeholder="Contraseña" className="rounded-md p-2 bg-slate-200"
                                    {...register("password", { required: true })} />
                                <button type="button" className="-mt-[1.82rem] sm:ml-[20rem] ml-[12rem] relative md:right-[6px] text-end pr-1" onClick={toggleSeePassword}>
                                    <ion-icon name={seePassword ? "eye-off-outline" : "eye-outline"}></ion-icon>
                                </button>
                                {errors.password?.message && (
                                    <p className="text-red-500 text-sm w-[90%] mt-2">{errors.password?.message}</p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xl">Confirmar Contraseña:</label>
                                <input type={seePasswordConfirm ? "text" : "password"} placeholder="Confirmar Contraseña" className="rounded-md p-2 bg-slate-200"
                                    {...register("confirm_password", { required: true })} />
                                <button type="button" className="-mt-[1.82rem] sm:ml-[20rem] ml-[12rem] relative md:right-[6px] text-end pr-1" onClick={toggleSeePasswordConfirm}>
                                    <ion-icon name={seePasswordConfirm ? "eye-off-outline" : "eye-outline"}></ion-icon>
                                </button>
                                {errors.confirm_password?.message && (
                                    <p className="text-red-500 text-sm w-[90%] mt-2">{errors.confirm_password?.message}</p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xl">Fecha de Nacimiento:</label>
                                <input type="date" placeholder="Fecha de Nacimiento" className="rounded-md p-2 bg-slate-200"
                                    {...register("birthday", { required: true })} />
                                {errors.birthday?.message && (
                                    <p className="text-red-500 text-sm w-[90%] mt-2">{errors.birthday?.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-around md:mt-0 mt-8 sm:flex-row flex-col">
                        <Link to={`/login`} className="flex justify-center p-4 text-sky-600 hover:drop-shadow-md">¿Ya tienes una cuenta?</Link>
                        <button className={`bg-[#C21D30] text-white px-8 py-2 rounded-md cursor-pointer hover:shadow-xl hover:bg-[#B30519] `}>Regístrate</button>
                    </div>
                </form>
            </section>
            {showToast && !passwordsEquals && (<ToastErrors onClose={closeToast} error={true}>Las dos contraseñas son distintas.</ToastErrors>)}
            {showToast && errorHTTP && (<ToastErrors onClose={closeToast}>{registerErrors}</ToastErrors>)}
        </main>
        <Footer />
        </>
    )
}

export default RegisterPage;