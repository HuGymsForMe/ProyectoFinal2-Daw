import { lazy } from "react";

import { useSeo } from "../hooks/useSeo";

const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));

import LogoAutoescuelaFast from "../assets/logo.png";
import CaraTriste from "../assets/triste.png";

// ******* PÁGINA DE ERROR 404 *******//
function NotFoundPage () {

    useSeo({
        title: "Página no encontrada | AutoescuelaFast",
        description: "No se ha podido encontrar la página que usted ha solicitado ver."
    })

    return(
        <>
        <Navbar/>
        <section className="min-h-screen bg-slate-100 text-shadow p-8 z-10 sm:w-auto w-[100%] flex flex-col justify-center items-center gap-y-4">
            <img className="sm:w-72 w-60"  src={LogoAutoescuelaFast} alt="Logo AutoescuelaFast" />
            <h2 className="text-black text-4xl text-center">Página no encontrada.</h2>
            <img src={CaraTriste} className="drop-shadow-2xl" alt="Cara Triste" />
        </section>
        <Footer />
        </>
    )
}

export default NotFoundPage;