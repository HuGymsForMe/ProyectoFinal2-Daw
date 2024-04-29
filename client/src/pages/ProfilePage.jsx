import { useState, useEffect, lazy } from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";

import { useSeo } from "../hooks/useSeo";

import { secondRed, API } from "../config/config";

import { useAuth } from "../context/UserContext";

const ToastErrors = lazy(() => import("../components/ToastErrors"));
const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));
const DiagramSuccess = lazy(() => import("../components/ProfilePage/DiagramSuccess"));
const DiagramLastTest = lazy(() => import("../components/ProfilePage/DiagramLastTest"));
const DiagramResultsByTest = lazy(() => import("../components/ProfilePage/DiagramResultsByTest"));
const DiagramPercentageSuccess = lazy(() => import("../components/ProfilePage/DiagramPercentageSuccess"));

// ******* PÁGINA DE PERFIL DEL USUARIO ******* //
function ProfilePage() {

    const [time, setTime] = useState(null);
    const [seePassword, setSeePassword] = useState(false);
    const [seePasswordConfirm, setSeePasswordConfirm] = useState(false);
    const [passwordsEquals, setPasswordEquals] = useState(true); //Comprueba si coinciden las contraseñas
    const [showToast, setShowToast] = useState(false); //Hace desaparecer y aparecer el toast

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { user, logout } = useAuth();
    const { idUser } = useParams();

    // ******* VISUALIZAR CONTRASEÑAS *******//
    const toggleSeePassword = () => {
        setSeePassword(!seePassword);
    };

    const toggleSeePasswordConfirm = () => {
        setSeePasswordConfirm(!seePasswordConfirm);
    };

    useEffect(() => {
        axios.get(`${API}/gametime/${idUser}`)
            .then((response) => {
                setTime(response.data);
            })
            .catch((error) => {
                console.log("Error fetching data:", error);
            });
    });

    useSeo({
        title: `${user.username} | AutoescuelaFast`,
        description: "Aquí podrás consultar todas tus estadísticas."
    })

    // ******* PROP PARA EL TOAST ******* //
    const closeToast = () => {
        setShowToast(false);
    }

    const onSubmit = async (data) => {
        if (data.password !== data.confirm_password || data.password.length < 5 || data.confirm_password.length < 5) {
            setPasswordEquals(false);
        } else {
            await axios.put(`${API}/users/${idUser}`, { password: data.password })   
        }
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
        return;
    }

    return (
        <>
            <Navbar />
            <main className="py-8 gap-y-8 flex flex-col items-center">
                <section className="flex justify-center">
                    <h1 className="text-4xl text-bold text-center text-white">Mi perfil</h1>
                </section>
                <section className="flex gap-4 w-[90%] xl:flex-row flex-col items-center xl:items-stretch">
                    <article className="flex items-center justify-center flex-col gap-y-8 bg-slate-200 p-6 shadow-lg shadow-slate-500 rounded-xl xl:w-[90%] w-[95%]">
                        <p className="text-2xl">PERFIL DE USUARIO</p>
                        <Avatar sx={{ width: 80, height: 80, bgcolor: secondRed, border: (theme) => `3px solid #bbb` }} alt={user.name}>{(user.name).substr(0, 1) + (user.surnames).substr(0, 1)}</Avatar>
                        <div className="flex justify-between gap-y-3 flex-col w-[100%]">
                            <p className="ml-6">Nombre de usuario:</p>
                            <p className="text-center text-xl">{user.username}</p>
                        </div>
                        <div className="flex justify-between gap-y-3 flex-col w-[100%]">
                            <p className="ml-6">Fecha de nacimiento:</p>
                            <p className="text-center text-xl">{user.birthday}</p>
                        </div>
                        <div className="flex justify-between gap-y-3 flex-col w-[100%]">
                            <p className="ml-6">Nombre:</p>
                            <p className="text-center text-xl">{user.name}</p>
                        </div>
                        <div className="flex justify-between gap-y-3 flex-col w-[100%]">
                            <p className="ml-6">Apellidos:</p>
                            <p className="text-center text-xl">{user.surnames}</p>
                        </div>
                        <div className="flex justify-between gap-y-3 flex-col w-[100%]">
                            <p className="ml-6">Tiempo Medio:</p>
                            <p className="text-center text-xl">{time}</p>
                        </div>
                        <div className="flex gap-x-6">
                            <Link to='/' onClick={() => { logout() }} className={`bg-[#C21D30] py-4 text-white px-8  border-2 border-[#999] rounded-md cursor-pointer hover:shadow-xl hover:bg-[#B30519] text-center`}>Cerrar Sesión</Link>
                        </div>
                    </article>
                    <div className="flex flex-col gap-4 xl:w-[90%] w-[95%]">
                        <article className="flex justify-center items-center flex-col gap-y-8 bg-slate-200 shadow-lg shadow-slate-500 p-8 rounded-xl min-h-[420px]">
                            <p className="text-xl text-center">ESTADÍSTICAS POR TEST</p>
                            <DiagramResultsByTest />
                        </article>
                        <article className="flex justify-center items-center flex-col gap-y-8 bg-slate-200 shadow-lg shadow-slate-500 p-8 rounded-xl min-h-[350px]">
                            <p className="text-xl text-center">BAREMO DE TEST APROBADOS (%)</p>
                            <DiagramPercentageSuccess />
                        </article>
                    </div>
                    <div className="flex flex-col gap-4 xl:w-[90%] w-[95%]">
                        <article className="flex justify-center items-center flex-col gap-y-8 bg-slate-200 shadow-lg shadow-slate-500 p-8 rounded-xl min-h-[420px]">
                            <p className="text-xl text-center">PORCENTAJE TEST APTOS</p>
                            <DiagramSuccess />
                        </article>
                        <article className="flex justify-center items-center flex-col gap-y-8 bg-slate-200 shadow-lg shadow-slate-500 p-8 rounded-xl min-h-[350px]">
                            <p className="text-xl text-center">ÚLTIMOS TEST REALIZADOS</p>
                            <DiagramLastTest />
                        </article>
                    </div>
                </section>
                <section className="bg-slate-200 p-6 shadow-lg shadow-slate-500 rounded-xl xl:w-[90%] w-[85%] -mt-4">
                <div className="flex md:flex-row flex-col justify-center items-center mb-4">
                            <h1 className={`text-2xl text-[#C21D30] font-semibold`}>Cambiar Contraseña</h1>
                        </div>
                        <form className="flex gap-x-4 justify-center w-[90%]" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex gap-4 xl:flex-row flex-col">
                                <div className="flex flex-col">
                                    <label className="text-xl">Contraseña:</label>
                                    <input
                                        type={seePassword ? "text" : "password"}
                                        placeholder="Contraseña"
                                        className="rounded-md p-2 bg-slate-200 border-2 border-black"
                                        {...register("password", { required: true })}
                                    />
                                    <button
                                        type="button"
                                        className="-mt-[1.82rem] sm:ml-[20rem] ml-[12rem] relative md:right-[6px] text-end pr-1"
                                        onClick={toggleSeePassword}
                                        aria-label="buttonSeePassword"
                                    >
                                        <ion-icon name={seePassword ? "eye-off-outline" : "eye-outline"} aria-label="iconSeePassword"></ion-icon>
                                    </button>
                                    {errors.password?.message && (
                                        <p className="text-red-500 text-sm w-[90%] mt-2">{errors.password?.message}</p>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-xl">Confirmar Contraseña:</label>
                                    <input
                                        type={seePasswordConfirm ? "text" : "password"}
                                        placeholder="Confirmar Contraseña"
                                        className="rounded-md p-2 bg-slate-200 border-2 border-black"
                                        {...register("confirm_password", { required: true })}
                                    />
                                    <button
                                        type="button"
                                        className="-mt-[1.82rem] sm:ml-[20rem] ml-[12rem] relative md:right-[6px] text-end pr-1"
                                        onClick={toggleSeePasswordConfirm}
                                        aria-label="buttonSeePasswordConfirm"
                                    >
                                        <ion-icon name={seePasswordConfirm ? "eye-off-outline" : "eye-outline"} aria-label="iconSeePasswordConfirm"></ion-icon>
                                    </button>
                                    {errors.confirm_password?.message && (
                                        <p className="text-red-500 text-sm w-[90%] mt-2">{errors.confirm_password?.message}</p>
                                    )}
                                </div>
                                <div className="flex md:mt-0 mt-8 sm:flex-row flex-col w-[100%] justify-end pt-1">
                                <button type="submit" className={`bg-[#C21D30] text-white px-8 py-2 rounded-md cursor-pointer hover:shadow-xl hover:bg-[#B30519] border-2 border-[#999] mt-6`}>Actualizar Perfil</button>
                            </div>
                            </div>
                        </form>
                </section>
            </main>
            {showToast && !passwordsEquals && (<ToastErrors onClose={closeToast} error={true}>Se ha producido un error al modificar la contraseña.</ToastErrors>)}
            {showToast && passwordsEquals && (<ToastErrors onClose={closeToast} error={false}>La contraseña se modificó con éxito.</ToastErrors>)}
            <Footer />
        </>
    )
}

export default ProfilePage;