import { Link } from 'react-router-dom';

import { useSeo } from "../hooks/useSeo"
import LogoAutoescuelaFast from "../assets/logo.png"; 

import TablesAccordion from '../components/AdminPage/TablesAccordion';
import TableQuestionsTest from '../components/AdminPage/TableQuestionsTest';
import TableWorks from '../components/AdminPage/TableWorks';
import TableUsers from '../components/AdminPage/TableUsers';
import TableFaQs from '../components/AdminPage/TableFaQs';

// ******* PÁGINA DEL PANEL DE ADMINISTRADOR ******* //
function AdminPage() {

    useSeo({
        title: "Panel de Administrador | AutoescuelaFast",
        description: "Te encuentras en el panel de administrador, dónde podrás visualizar todos los datos y manipularlos."
    })

    return(
        <>
            <header className="min-h-20 bg-slate-200 flex justify-center items-center md:flex-row flex-col lg:p-0 p-2">
                <div className="flex gap-x-8">
                    <h2 className="italic font-semibold flex items-center justify-center">PANEL DE ADMINISTRADOR</h2>
                    <img className="sm:w-64 w-32 cursor-pointer"  src={LogoAutoescuelaFast} alt="Logo AutoescuelaFast" />
                </div>
                <Link to={`/`} onClick={() => {setMenuToggle(false)}} className='lg:absolute lg:right-4'>
                        <button type='button' className={`bg-[#C21D30] text-white px-5 py-2 rounded-full hover:bg-[#B30519] sm:text-base text-xs focus:border-slate-800 border-2`}>Volver al panel de usuario</button>
                </Link>
            </header>
            <main className="min-h-screen flex">
                <aside className="w-[25%] bg-slate-200 min-h-screen border border-t-2 border-black">
                    <div>
                        <TablesAccordion title={"Usuarios"} first_option={"Mostrar Usuarios"} second_option={"Actualizar Usuarios"} third_option={"Borrar Usuarios"} fourth_option={"Añadir un usuario"} fifth_option={"Añadir un usuario"}/>
                        <TablesAccordion title={"Preguntas Test"} first_option={"Mostrar Preguntas Test"} second_option={"Actualizar Preguntas Test"} third_option={"Borrar Preguntas Test"} fourth_option={"Añadir una Pregunta Test"}/>
                        <TablesAccordion title={"Contacto"} first_option={"Mostrar Dudas Contacto"} second_option={"Actualizar Dudas Contacto"} third_option={"Borrar Dudas Contacto"} fourth_option={"Añadir una Duda Contacto"}/>
                        <TablesAccordion title={"Trabajo"} first_option={"Mostrar Candidaturas"} second_option={"Actualizar Candidaturas"} third_option={"Borrar Candidaturas"} fourth_option={"Añadir una Candidatura"}/>
                        <TablesAccordion title={"FaQ's"} first_option={"Mostrar FaQ's"} second_option={"Actualizar FaQ's"} third_option={"Borrar FaQ's"} fourth_option={"Añadir una FaQ's"}/>
                        <TablesAccordion title={"Tests"} first_option={"Mostrar Tests"} second_option={"Actualizar Tests"} third_option={"Borrar Tests"} fourth_option={"Añadir un Test"}/>
                        <TablesAccordion title={"Partidas"} first_option={"Mostrar Partidas"} second_option={"Actualizar Partidas"} third_option={"Borrar Partidas"} fourth_option={"Añadir una Partida"}/>
                    </div>
                </aside>
                <section className="w-[75%] mt-6">
                    {/* <TableUsers /> */}
                    {/* <TableQuestionsTest /> */}
                    {/* <TableWorks /> */}
                    <TableFaQs />
                </section>
            </main>
        </>
    )
}

export default AdminPage;