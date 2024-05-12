import { useEffect, useState, lazy } from "react";

import { useSeo } from "../hooks/useSeo";

import carLicense from "../assets/cocheautoescuela.png";

const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));

// ******* PÁGINA DE ¿QUIÉNES SOMOS? ******* //
function WeArePage() {

    useSeo({
        title: "Quiénes Somos | AutoescuelaFast",
        description: "Autoescuela Fast lleva años ayudando a nuestros futuros conductores en su camino por obtener el permiso teórico de la manera más cómoda y rápida posible."
    })

    return (
        <>
            <Navbar />
            <main className="text-white py-8 gap-y-8 flex flex-col items-center min-h-screen">
                <section className="xl:mt-20 flex justify-center w-[75%] items-center gap-6 bg-white text-[#C21D30] rounded-lg p-8 flex-col md:my-auto">
                    <div className="flex">
                        <div className="flex flex-col gap-4">
                            <p>Bienvenido a Autoescuela Fast, tu compañero de confianza en el emocionante viaje hacia la obtención de tu permiso de conducir. Desde nuestros inicios, nos hemos dedicado apasionadamente a brindar a nuestros estudiantes una experiencia educativa de calidad que sea tanto eficiente como efectiva. Con años de experiencia a nuestras espaldas, hemos perfeccionado nuestros métodos para ofrecer el camino más rápido y cómodo hacia el éxito teórico.</p>
                            <p>En Autoescuela Fast, entendemos que obtener el permiso de conducir es un paso importante en la vida de nuestros estudiantes. Por eso, nos comprometemos a proporcionar no solo un extenso banco de preguntas teóricas, sino también recursos y herramientas adicionales para garantizar que cada estudiante comprenda a fondo los conceptos fundamentales de seguridad vial. Nuestra meta no es solo que apruebes los exámenes, sino que internalices estos conocimientos para que te conviertas en un conductor seguro y responsable en la carretera.</p>
                            <p>Nos enorgullece el éxito de nuestros estudiantes. Ver cómo cada uno de ellos avanza desde el primer día de estudio hasta el momento en que obtienen su permiso de conducir es nuestra mayor satisfacción. Sabemos que el camino puede ser desafiante, pero estamos aquí para apoyarte en cada paso del camino. Desde nuestro equipo de instructores expertos hasta nuestra plataforma de aprendizaje intuitiva, estamos comprometidos a brindarte la mejor experiencia educativa posible.</p>
                        </div>
                        <div>
                            <img src={carLicense} alt="Logo Autoescuela Fast" />
                        </div>
                    </div>
                    <div className="h-[1px] w-full bg-[#E13347]"></div>
                    <div className="flex">
                        <div className="flex flex-col gap-4">
                            <p>En Autoescuela Fast, no solo te ayudamos a aprobar los exámenes; te preparamos para la vida en la carretera. Únete a nosotros en este viaje emocionante y descubre por qué somos la elección preferida de aquellos que buscan obtener su permiso teórico de manera rápida, cómoda y efectiva.</p>                
                            <p>En Autoescuela Fast, nos esforzamos por hacer que el proceso de aprendizaje sea lo más accesible posible para nuestros estudiantes. Nuestra plataforma en línea está diseñada pensando en la comodidad y la facilidad de uso, permitiéndote estudiar en cualquier momento y desde cualquier lugar. Ya sea que prefieras repasar conceptos en tu computadora de escritorio o practicar en tu teléfono móvil mientras esperas el autobús, estamos aquí para adaptarnos a tu estilo de vida ocupado. Con lecciones interactivas, simulacros de exámenes realistas y un seguimiento personalizado de tu progreso, estamos comprometidos a brindarte las herramientas que necesitas para alcanzar tus metas de forma rápida y efectiva.</p>
                        </div>
                        <div>
                            <img src={carLicense} alt="Logo Autoescuela Fast" />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default WeArePage;
