import { thirdRed, secondGreen } from "../config/config";

// TODO: (EDITAR BOTÓN)
// ******* COMPONENTE QUE CONTIENE MENSAJES DE POSIBLES ERRORES EN LA INTERFAZ DEL USUARIO ******* //

function ToastErrors({onClose, error, children}) {
  return (
    <div className="fixed bottom-8 sm:right-8 z-50 flex justify-center items-center">
        <div id="toast-default" className={`sm:w-auto w-[90%] flex items-center max-w-xs p-4 rounded-lg shadow ${ error ? 'bg-[#E8162E]' : 'bg-[#318950]'}`}>
            <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-white ${ error ? 'bg-[#E8162E]' : 'bg-[#318950]'} rounded-lg text-lg`}>
            <ion-icon name="information-circle-outline"></ion-icon>
            </div>
            <div className="ms-3 text-sm font-normal text-white">{children}</div>
            <button type="button" onClick={onClose} className={`ms-auto -mx-1.5 -my-1.5 ${ error ? 'bg-[#E8162E]' : 'bg-[#318950]'} text-white ${ error ? 'hover:bg-[#B30519]' : 'hover:bg-[#589f71]'} rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8`}>
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
        </div>
  )
}

export default ToastErrors;
