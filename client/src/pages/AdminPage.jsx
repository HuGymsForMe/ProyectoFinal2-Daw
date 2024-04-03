import { useSeo } from "../hooks/useSeo"

function AdminPage() {

    useSeo({
        title: "Panel de Administrador | AutoescuelaFast",
        description: "Te encuentras en el panel de administrador, dónde podrás visualizar todos los datos y manipularlos."
    })
}

export default AdminPage;