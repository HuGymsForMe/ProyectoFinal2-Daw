import { TailSpin } from "react-loader-spinner";

import LogoAutoescuelaFast from "../assets/logo.png";

// ******* PANTALLA DE CARGA ******* //
function LoadingPage () {
    return (
        <main className="flex justify-center items-center h-screen bg-white" id="loading">
            <section className="text-shadow p-8 z-10 sm:w-auto w-[100%] flex flex-col justify-center items-center gap-y-4">
                <img className="sm:w-72 w-60"  src={LogoAutoescuelaFast} alt="Logo AutoescuelaFast" />
                <TailSpin height="50" width="50" color="#C21D30" ariaLabel="Loading" radius={10} />
            </section>
        </main>
    )
}

export default LoadingPage;