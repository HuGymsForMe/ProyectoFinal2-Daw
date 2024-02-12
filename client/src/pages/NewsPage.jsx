import { useEffect, useState, lazy } from "react";

import axios from "axios";

import { API } from "../config/config";

import { useSeo } from "../hooks/useSeo";

const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));
const ArticleNews = lazy(() => import("../components/NewsPage/ArticleNews"))

// ******* PÁGINA DE NOTICIAS ACERCA DE NUESTRA AUTOESCUELA ******* //
function NewsPage(){

    useSeo({
        title: "Noticias | AutoescuelaFast",
        description: "Apartado de noticias dónde informaremos de toda la actualidad de Autoescuela Fast"
    })

    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(`${API}/news`).then((response) => {
            setData(response.data);
        })
    }, [])

    if (!data) return null

    return(
        <>
        <Navbar />
        <main className="flex flex-col gap-y-6 justify-center items-center h-screen">
            {data.map((item, i) => (
                <ArticleNews 
                    key={item._id}
                    title={item.title}
                    subtitle={item.subtitle}
                    countDistribution={i}
                    image={item.image}
                 />
            ))}
        </main>
        <Footer />
        </>
        
    )
}

export default NewsPage;