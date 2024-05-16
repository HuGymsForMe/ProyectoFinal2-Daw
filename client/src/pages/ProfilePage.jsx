import { useState, useEffect, lazy } from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import axios from "axios";

import { useSeo } from "../hooks/useSeo";

import { secondRed, API } from "../config/config";

import { useAuth } from "../context/UserContext";

const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));
const DiagramSuccess = lazy(() => import("../components/ProfilePage/DiagramSuccess"));
const DiagramLastTest = lazy(() => import("../components/ProfilePage/DiagramLastTest"));
const DiagramResultsByTest = lazy(() => import("../components/ProfilePage/DiagramResultsByTest"));
const DiagramPercentageSuccess = lazy(() => import("../components/ProfilePage/DiagramPercentageSuccess"));
const ModalChangePassword = lazy(() => import("../components/ProfilePage/ModalChangePassword"));

// ******* PÁGINA DE PERFIL DEL USUARIO ******* //
function ProfilePage() {

    const [time, setTime] = useState(null);
    const [showModal, setShowModal] = useState(false); //Hace desaparecer y aparecer el modal de cambiar contraseña

    const { user, logout } = useAuth();
    const { idUser } = useParams();

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

    // ******* PROPS PARA EL MODAL ******* //
    const closeModal = () => {
        setShowModal(false);
    }

    const openModal = () => {
        setShowModal(true);
    };

    return (
        <>
            <Navbar />
            <main className="py-8 gap-y-8 flex flex-col items-center">
                <section className="flex justify-center xl:mt-16">
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
                        <div className="flex justify-center gap-x-6">
                            <Link to='/' onClick={() => { logout() }} className={`bg-[#C21D30] py-4 text-white px-6  border-2 border-[#999] rounded-md cursor-pointer hover:shadow-xl hover:bg-[#B30519] text-center text-sm`}>Cerrar Sesión</Link>
                            <Link className={`bg-[#318950] py-4 text-white px-6 border-2 border-[#999] rounded-md cursor-pointer hover:shadow-xl hover:bg-[#26693e] text-center text-sm`} onClick={openModal}>Cambiar Contraseña</Link>
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
            </main>
            <Footer />
            { showModal && <ModalChangePassword onClose={closeModal} />}</>
    )
}

export default ProfilePage;