import { useState, lazy } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

import axios from "axios";
import { API } from "../../config/config";

const ToastErrors = lazy(() => import("../ToastErrors"));

import LogoAutoescuelaFast from "../../assets/logo.png";
import "../../styles/Modals.css"

function ModalChangePassword ({onClose}) {

    const [message, setMessage] = useState(null)
    const [showToast, setShowToast] = useState(false);
    const [seePassword, setSeePassword] = useState(false);
    const [seePasswordConfirm, setSeePasswordConfirm] = useState(false);

    const { register, handleSubmit } = useForm();

    const { idUser } = useParams();

    const onSubmit = async (data) => {
        if (data.password !== data.confirm_password || data.password.length < 5 || data.confirm_password.length < 5) {
            setPasswordEquals(false);
        } else {
            await axios.put(`${API}/users/${idUser}`, { password: data.password })
            setMessage("Se ha cambiado la contraseña con éxito.")   
        }
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
        return;
    }

    // ******* PROP PARA EL TOAST ******* //
    const closeToast = () => {
        setShowToast(false);
    }

    // ******* VISUALIZAR CONTRASEÑAS *******//
    const toggleSeePassword = () => {
        setSeePassword(!seePassword);
    };

    const toggleSeePasswordConfirm = () => {
        setSeePasswordConfirm(!seePasswordConfirm);
    };


    return(
        <>
        <div className="modal-overlay z-50">
            <div className="modal bg-white" id="modalPassword">
                <div className="flex justify-center flex-col gap-4">
                    <div className="flex gap-x-10 justify-center sm:flex-row flex-col items-center gap-y-4">
                        <h1 className="text-xl text-[#C21D30]">Cambiar contraseña</h1>
                        <img className="sm:w-40 w-32" src={LogoAutoescuelaFast} alt="Logo AutoescuelaFast" />
                    </div>
                    <div>
                        <p className="text-sm text-[#C21D30] text-center">Modifique la contraseña de su cuenta de Autoescuela Fast.</p>
                    </div>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-2">
                            <label className="fontSM">Contraseña:</label>
                            <input
                                        type={seePassword ? "text" : "password"}
                                        placeholder="Contraseña"
                                        className="rounded-md p-2 bg-slate-200 fontSM"
                                        {...register("password", { required: true })}
                                    />
                            <button
                                        type="button"
                                        className="cursor-default -mt-[2.3rem] sm:ml-[20rem] ml-[12rem] relative md:right-[6px] text-end pr-1"
                                        aria-label="buttonSeePasswordConfirm"
                                    >
                                        <Link className="cursor-pointer">
                                            <ion-icon name={seePassword ? "eye-off-outline" : "eye-outline"} onClick={toggleSeePassword} aria-label="iconSeePassword"></ion-icon>
                                        </Link>
                                    </button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="fontSM">Confirmar Contraseña:</label>
                            <input
                                        type={seePasswordConfirm ? "text" : "password"}
                                        placeholder="Confirmar Contraseña"
                                        className="rounded-md p-2 bg-slate-200 fontSM"
                                        {...register("confirm_password", { required: true })}
                                    />
                            <button
                                        type="button"
                                        className="cursor-default -mt-[2.3rem] sm:ml-[20rem] ml-[12rem] relative md:right-[6px] text-end pr-1"
                                        aria-label="buttonSeePasswordConfirm"
                                    >
                                        <Link className="cursor-pointer">
                                            <ion-icon name={seePassword ? "eye-off-outline" : "eye-outline"} onClick={toggleSeePasswordConfirm} aria-label="iconSeePassword"></ion-icon>
                                        </Link>
                                    </button>
                        </div>
                        <div className="flex justify-end">
                            <input type="submit" value="Modificar Contraseña" className="bg-[#C21D30] text-sm mt-2 2xs:w-auto w-full border-2 border-[#999] text-white py-2 px-10 text-md rounded-md cursor-pointer hover:shadow-xl hover:bg-[#B30519]" />
                        </div>
                    </form>
                </div> 
                <button className="close-button" onClick={onClose}>
                    <p className="text-4xl"><ion-icon name="close"></ion-icon></p>
                </button>            
            </div>
        </div>
        {showToast && message && (<ToastErrors onClose={closeToast} error={false}>Se ha podido cambiar la contraseña con éxito.</ToastErrors>)}
        {showToast && !message && (<ToastErrors onClose={closeToast} error={true}>No se ha podido cambiar la contraseña con éxito.</ToastErrors>)}
        </>
    )
}

export default ModalChangePassword;