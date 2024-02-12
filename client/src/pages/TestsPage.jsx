import { useEffect, useState, lazy } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { useSeo } from "../hooks/useSeo";

import { API } from "../config/config";

const ButtonTest = lazy(() => import("../components/TestsPage/ButtonTest"));
const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));

// ******* PÁGINA DE MIS TESTS ******* //
function TestsPage(){

    useSeo({
        title: "Tests | AutoescuelaFast",
        description: "Aquí tienes todos los test a realizar, mucha suerte y por el aprobado genérico."
    })

    const {idUser} = useParams();

    const [data, setData] = useState(null) //Test de la autoescuela.

    useEffect(() => {
        axios.get(`${API}/gametests/${idUser}`)
            .then((response) => {
                setData(response.data);
            }).catch((error) => {
                console.log("Error fetching data:", error);
        })
    }, [idUser]);

    if(!data) return null;

    return(
        <>
        <Navbar />
        <main className="flex flex-col">
            <section className="flex justify-center items-center">
                <h1 className="text-3xl text-white my-8">MIS TESTS</h1>
            </section>
            <section className="flex flex-col justify-center items-center gap-y-8 mb-8">
                {data.map((testToBePeformed, i) => (
                    (testToBePeformed.misses == "XX") 
                    ? <ButtonTest key={testToBePeformed.test} number_test={i+1} id_test={testToBePeformed.test} time={testToBePeformed.time} misses={testToBePeformed.misses} made={false} />
                    : <ButtonTest key={testToBePeformed.test} number_test={i+1} id_test={testToBePeformed.test} time={testToBePeformed.time} misses={testToBePeformed.misses} made={true} />
                ))}
            </section>
        </main>
        <Footer />
        </>
    )
}

export default TestsPage;