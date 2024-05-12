import { useEffect, useState, lazy } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { API } from "../config/config";

import { useSeo } from "../hooks/useSeo";

import carLicense from "../assets/cocheautoescuela.png";
import { useAuth } from "../context/UserContext";

const FAQAccordion = lazy(() => import("../components/HomePage/FAQAcorddion"))
const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));

// ******* PÁGINA DE INICIO ******* //
function HomePage() {

    useSeo({
        title: "Inicio | AutoescuelaFast",
        description: "Página de Inicio de la Autoescuela Fast, aquí obtendrás toda tu información para poder sacarte tu examen teórico del permiso B lo antes posible."
    })

    const [data, setData] = useState(null);
    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
        axios.get(`${API}/faqs`).then((response) => {
            setData(response.data);
        });
    }, []);

    if (!data) return null;

    return (
        <>
            <Navbar />
            <main className="text-white py-8 gap-y-8 flex flex-col items-center min-h-screen">
                <section className="flex justify-center xl:mt-20">
                    <h1 className="text-4xl text-bold text-center">Bienvenido a Autoescuela Fast</h1>
                </section>
                <section className="flex justify-center w-[75%] items-center gap-6 bg-white text-[#C21D30] rounded-lg p-8 xl:flex-row flex-col md:my-auto">
                    <div className="flex flex-col gap-y-2 xl:order-1 order-2">
                        <p className="text-xl text-pretty">¡Bienvenido a nuestra AutoescuelaFast, tu camino hacia la libertad en la carretera comienza aquí!</p>
                        <p>En AutoescuelaFast, entendemos lo importante que es para ti obtener tu permiso teórico de conducir de manera conveniente y eficiente. Por eso, hemos desarrollado un programa completo y accesible que te permitirá estudiar y prepararte para el examen teórico desde la comodidad de tu hogar, en tu propio ritmo.</p>
                        <p className="text-lg font-bold">¿Por qué elegir Autoescuela Fast?</p>
                        <ul>
                            <li><span className="italic font-semibold">Flexibilidad Horaria:</span> Olvídate de los horarios fijos. Accede a nuestras lecciones en línea en cualquier momento del día o de la noche. Adaptamos la formación a tu agenda.</li>
                            <li><span className="italic font-semibold">Soporte Profesional:</span> Contamos con instructores expertos disponibles para resolver tus dudas. A través de chat en vivo o correo electrónico, recibirás la ayuda que necesitas para comprender cualquier concepto.</li>
                            <li><span className="italic font-semibold">Simulacros de Examen:</span> Practica con nuestros simulacros de examen para evaluar tu progreso. Identifica tus áreas de mejora y fortalece tus conocimientos antes de enfrentarte al examen teórico oficial.</li>
                        </ul>
                    </div>
                    <img src={carLicense} alt="Coche Autoescuela" className="rounded-lg xl:w-[33%] xl:h-[17%] sm:w-[66%] sm:h-[33%] w-[90%] h-[45%]" />
                </section>
                <section className="flex xl:flex-row flex-col w-[75%] items-center gap-6">
                        <article className="xl:w-[50%] w-[100%]">
                        <Link className="flex flex-col items-center px-4 py-8 gap-y-4 rounded-xl bg-white" to={isAuthenticated ? `/tests/${user.id}` : "/login"}>
                            <h3 className="text-[#C21D30] text-bold text-4xl text-center">Realizar Test</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-14 h-14 fill-[#C21D30]`}>
                                <path fillRule="evenodd" d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5Z" clipRule="evenodd" />
                            </svg>
                            <p className="text-[#C21D30] lg:text-center text-pretty">¡ Podrás realizar muchos test ! Además de ver en tu perfil de test, tus mejores resultados en cuanto a tiempo y fallos. Nuestro objetivo es que salgas de AutoescuelaFast con todos los test en verde y con tu exámen teórico aprobado.</p>
                        </Link>                  
                        </article>
                        <article className="xl:w-[50%] w-[100%]">
                        <Link className="flex flex-col items-center px-4 py-8 gap-y-4 rounded-xl bg-white" to={isAuthenticated ? `/profile/${user.id}` : "/login"}>
                            <h3 className="text-[#C21D30] text-bold text-4xl text-center">Ver mis estadísticas</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-14 h-14 fill-[#C21D30]`}>
                                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                            </svg>
                            <p className="text-[#C21D30] lg:text-center text-pretty">¡ Podrás ver toda tu evolución ! Cuántas veces has entrado, en que exámenes has mejorado, cuántos y qué tests has hecho y qué fallos has tenido para que puedas repasar. ¡ Además te damos tu probabilidad de aprobado !</p>
                        </Link>
                        </article>
                </section>
                <section className="flex flex-col items-center w-[85%]">
                    <h2 className="text-3xl text-bold">Preguntas frecuentes</h2>
                </section>
                <section className="flex flex-col items-center w-[83.5%]">
                    {data.map((faq) => (
                        <FAQAccordion key={faq._id} question={faq.question} answer={faq.answer} />
                    ))}
                </section>
            </main>
            <Footer />
        </>
    )
}

export default HomePage;
