import { Link } from "react-router-dom";

import LogoAutoescuelaFast from "../assets/logo.png";

// ******* PIE DE PÁGINA ******* //
function Footer() {

    const currentYear = new Date().getFullYear(); //Calcula el año actual para el footer

    return (
        <footer className="bg-slate-200 flex xl:flex-row flex-col justify-center gap-x-8 p-8 gap-y-4">
            <section className="flex justify-center items-center flex-col">
                <img className="w-72" src={LogoAutoescuelaFast} alt="Logo AutoescuelaFast" />
                <p className="text-center text-xs">&copy; {currentYear} Autoescuela Fast.</p>
                <p className="text-center text-xs">Todos los derechos reservados</p>
            </section>
            <section className="flex md:flex-row flex-col items-center gap-y-8">
                <section className="md:w-[50%] w-[80%] flex flex-col justify-center items-center">
                    <li className="flex justify-center text-lg hover:scale-105 duration-300">
                        <Link className={`hover:text-[#C21D30] cursor-pointer`}>Sobre Nosotros</Link>
                    </li>
                    <li className="flex justify-center text-lg hover:scale-105 duration-300">
                        <Link className={`hover:text-[#C21D30] cursor-pointer`}>Contáctanos</Link>
                    </li>
                    <li className="flex justify-center text-lg hover:scale-105 duration-300">
                        <Link className={`hover:text-[#C21D30] cursor-pointer`}>Aviso Legal</Link>
                    </li>
                    <li className="flex justify-center text-lg hover:scale-105 duration-300">
                        <Link className={`hover:text-[#C21D30] cursor-pointer`}>Política de privacidad</Link>
                    </li>
                    <li className="flex justify-center text-lg hover:scale-105 duration-300">
                        <Link className={`hover:text-[#C21D30] cursor-pointer`}>Política de cookies</Link>
                    </li>
                    <li className="flex justify-center text-lg hover:scale-105 duration-300">
                        <Link className={`hover:text-[#C21D30] cursor-pointer`}>Política de redes sociales</Link>
                    </li>
                </section>
                <section className="flex flex-col justify-center items-center md:w-[50%] w-[80%]">
                    <p className="text-center text-2xl font-semibold uppercase flex">Únete al club de aprobados de Autoescuela Fast</p>
                    <p className="text-center text-xl flex">Muchos alumnos han confiado en nuestros servicios para poder sacar su exámen teórico adelante</p>
                </section>
            </section>
            <section className="flex gap-x-2 justify-center items-end">
                <p className="hover:text-[#24A3F2] text-3xl duration-300"><ion-icon name="logo-twitter"></ion-icon></p>
                <p className="hover:text-[#0866FF] text-3xl duration-300"><ion-icon name="logo-facebook"></ion-icon></p>
                <p className="hover:text-[#FE08AC] text-3xl duration-300"><ion-icon name="logo-instagram"></ion-icon></p>
                <p className="hover:text-[#FF0000] text-3xl duration-300"><ion-icon name="logo-youtube"></ion-icon></p>
                <p className="hover:text-[#0C67C2] text-3xl duration-300"><ion-icon name="logo-linkedin"></ion-icon></p>
            </section>
        </footer>
    )
}

export default Footer;