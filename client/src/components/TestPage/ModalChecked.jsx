import { Link } from "react-router-dom";

import { useAuth } from "../../context/UserContext";

import LogoAutoescuelaFast from "../../assets/logo.png";

import "../../styles/ModalChecked.css"

function ModalChecked ({format_stopwatch, misses, pass, onClose}) {

    const { user } = useAuth();

    return(
        <div className="modal-overlay z-30">
            <div className="modal bg-slate-200">
                <div className="flex justify-between flex-row">
                    <p className="text-2xl flex items-center p-2 font-semibold italic">TEST CORREGIDO</p>
                    <img className="sm:w-64 w-32 cursor-pointer hidden lg:block"  src={LogoAutoescuelaFast} alt="Logo AutoescuelaFast" />
                </div>
                <div className={`${pass ? 'bg-green-300' : 'bg-red-300'} rounded-xl flex gap-y-4 flex-col p-6`}>
                    { pass ? <p className="text-2xl">APTO</p> : <p className="text-2xl">NO APTO</p>}
                    <p className="text-2xl">Tiempo: {format_stopwatch}</p>
                    <p className="text-2xl">Fallos: {misses}</p>
                    <div className="flex justify-end gap-x-4 md:flex-row flex-col gap-y-2">
                        <Link to={`/tests/${user.id}`} className="bg-sky-500 text-white px-5 py-2 rounded-full cursor-pointer hover:shadow-xl hover:bg-sky-600 focus:border-slate-800 border-2 text-center">Realizar otro test</Link>
                        <button className="bg-[#C21D30] text-white px-5 py-2 rounded-full hover:bg-[#B30519] hover:shadow-xl focus:border-slate-800 border-2 text-center" onClick={onClose}>Ver corrección</button>
                    </div>
                </div>  
                <button className="close-button" onClick={onClose}>
                    <p className="text-4xl"><ion-icon name="close"></ion-icon></p>
                </button>            
            </div>
        </div>
    )
}

export default ModalChecked;