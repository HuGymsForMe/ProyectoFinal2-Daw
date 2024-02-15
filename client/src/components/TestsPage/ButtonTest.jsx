import { Link } from "react-router-dom";

// ******* BOTÓN DE ACCESO A LOS TEST Y MUESTRA DE MEJOR PARTIDA ******* //
function ButtonTest({ id_test, number_test, misses, time, made }) {

    return (
        <Link to={`/test/${id_test}`} className="cursor-pointer w-[90%]">
                <article className={`${made ? misses <=3 ? 'bg-green-300' : 'bg-red-300' : 'bg-slate-200'} p-8 rounded-lg hover:scale-[1.03] duration-700`}>
                <div className="flex justify-between">
                    <h2 className="text-3xl font-bold">TEST {number_test}</h2>
                    <input type="checkbox" checked={made} className="h-6 w-6" readOnly aria-label="checkTest" />
                </div>
                <div className="flex justify-between sm:flex-row flex-col gap-y-2">
                    <p className="text-xl">Mejor resultado: </p>
                    <p className="text-xl">Fallos: {misses}</p>
                    <p className="text-xl">Tiempo: {time}</p>
                </div>
        </article>
        </Link>
    )
}

export default ButtonTest;