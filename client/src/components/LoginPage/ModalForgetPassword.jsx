import { useState, lazy } from "react";
import LogoAutoescuelaFast from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API } from "../../config/config";

import "../../styles/ModalChecked.css"

const ToastErrors = lazy(() => import("../ToastErrors"));

function ModalChecked ({onClose}) {

    const [message, setMessage] = useState(null)
    const [showToast, setShowToast] = useState(false);

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            await axios.put(`${API}/usersemail`, { email: data.email })   
            setMessage("Se envío la contraseña tu correo.");
        } catch (error) {
            console.log(error);
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

    return(
        <>
        <div className="modal-overlay z-30">
            <div className="modal bg-white">
                <div className="flex justify-center flex-col gap-4">
                    <div className="flex gap-x-10 justify-center sm:flex-row flex-col items-center gap-y-4">
                        <h1 className="text-xl text-[#C21D30]">Olvidaste tu contraseña</h1>
                        <img className="sm:w-40 w-32" src={LogoAutoescuelaFast} alt="Logo AutoescuelaFast" />
                    </div>
                    <div>
                        <p className="text-sm text-[#C21D30] text-center">Te enviaremos una contraseña al correo electrónico de tu cuenta.</p>
                    </div>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-2">
                            <label>Correo Electrónico:</label>
                            <input type="email" className="rounded-md p-2 bg-slate-200" placeholder="Correo de tu cuenta..." 
                            {...register("email", { required: true })}/>
                        </div>
                        <div className="flex justify-end">
                            <input type="submit" value="Enviar Correo" className="bg-[#C21D30] border-2 border-[#999] text-white py-2 px-10 text-md rounded-md cursor-pointer hover:shadow-xl hover:bg-[#B30519]" />
                        </div>
                    </form>
                </div> 
                <button className="close-button" onClick={onClose}>
                    <p className="text-4xl"><ion-icon name="close"></ion-icon></p>
                </button>            
            </div>
        </div>
        {showToast && message && (<ToastErrors onClose={closeToast} error={false}>Se ha enviado un correo a tu cuenta.</ToastErrors>)}
        {showToast && !message && (<ToastErrors onClose={closeToast} error={true}>No se ha podido hacer el envío a tu correo.</ToastErrors>)}
        </>
    )
}

export default ModalChecked;