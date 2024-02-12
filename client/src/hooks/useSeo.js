import { useEffect } from "react";

// ******* NOS PERMITE TENER UN "HEAD" DINÁMICO DEPENDIENDO DE LA UBICACIÓN DEL USUARIO ******* //
export function useSeo ({title, description}){
    useEffect(() => {
        document.title = title;
        document.querySelector('meta[name="description"]')
        ?.setAttribute("content", description);
    }, [title, description])
}