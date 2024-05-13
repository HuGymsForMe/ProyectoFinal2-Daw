import { useState, useEffect, lazy } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../schemas/user.schema";

import { useAuth } from "../context/UserContext";

import { useSeo } from "../hooks/useSeo";

const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));
const ToastErrors = lazy(() => import("../components/ToastErrors"));

import LogoAutoescuelaFast from "../assets/logo.png";

// ******* PÁGINA DE LOGEO DE USUARIOS ******* //
function LoginPage() {

    useSeo({
        title: "Login | AutoescuelaFast",
        description: "Inicia Sesión para poder acceder a toda la información de tu cuenta personal de los test realizados y tus estadísticas personales."
    })

    const [seePassword, setSeePassword] = useState(false);
    const [errorHTTP, setErrorHTTP] = useState(false); //Comprueba si hay errores a la hora de hacer peticiones HTTP
    const [showToast, setShowToast] = useState(false); //Hace desaparecer y aparecer el toast

    // ******* VISUALIZAR CONTRASEÑAS *******//
    const toggleSeePassword = () => {
        setSeePassword(!seePassword);
    };

    // ******* PROP PARA EL TOAST ******* //
    const closeToast = () => {
        setShowToast(false);
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
    });
    const { signin, errors: loginErrors, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        // ******* POSIBLE RESPUESTA 400 ******* //
        if (!await signin(data)) {
            setErrorHTTP(true);
            setShowToast(true);
            //reset();
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return;
        }
    }

    // ******* INICIO DE SESIÓN DEL USUARIO AL RELLENAR EL FORMULARIO ******* //
    useEffect(() => {
        if (isAuthenticated) navigate("/");
    }, [isAuthenticated]);

    return (
        <><Navbar />        
        <main className="flex justify-center items-center min-h-screen">
            <section className=" bg-white p-8 flex flex-col gap-y-8 rounded-xl shadow-slate-500 shadow-lg z-10 sm:w-auto w-[90%] md:my-16 xl:mt-32">
                <div className="flex gap-x-10 justify-center sm:flex-row flex-col items-center gap-y-4">
                    <h1 className="text-4xl text-[#C21D30]">Iniciar Sesión</h1>
                    <img className="sm:w-56 w-40" src={LogoAutoescuelaFast} alt="Logo AutoescuelaFast" />
                </div>
                <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col">
                        <label className="text-xl">Nombre de usuario:</label>
                        {/* <ion-icon name="person-outline"></ion-icon> */}
                        <input type="text" placeholder="Nombre de usuario" className="rounded-md p-2 bg-slate-200"
                            {...register("username", { required: true, minLength: 6, maxLength: 14 })} />
                        {errors.username?.message && (
                            <p className="text-red-500 text-sm w-[90%] mt-4">{errors.username?.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xl">Contraseña:</label>
                        {/* <ion-icon name="key-outline"></ion-icon> */}
                        <input type={seePassword ? "text" : "password"} placeholder="Contraseña" className="rounded-md p-2 bg-slate-200"
                            {...register("password", { required: true, minLength: 6, maxLength: 18 })} />
                        <button type="button" className="-mt-[1.82rem] sm:ml-[20rem] ml-[12rem] relative md:right-[6px] text-end pr-1" onClick={toggleSeePassword} aria-label="buttonSeePassword">
                            <ion-icon name={seePassword ? "eye-off-outline" : "eye-outline"} aria-label="iconSeePassword"></ion-icon>
                        </button>
                        {errors.password?.message && (
                            <p className="text-red-500 text-sm w-[90%] mt-4">{errors.password?.message}</p>
                        )}
                    </div>
                    <div className="flex sm:flex-row flex-col gap-x-4 sm:pt-4 justify-evenly">
                        <Link to={`/register`} className="flex justify-center p-4 text-sky-600 hover:drop-shadow-md cursor-pointer">¿Aún no tienes una cuenta?</Link>
                        <input type="submit" value="Iniciar sesión" className="bg-[#C21D30] border-2 border-[#999] text-white py-2 px-4 rounded-md cursor-pointer hover:shadow-xl hover:bg-[#B30519]" />
                    </div>
                </form>
            </section>
            {showToast && errorHTTP && (<ToastErrors onClose={closeToast} error={true}>{loginErrors}</ToastErrors>)}
        </main><Footer /></>

    )
}

export default LoginPage;
