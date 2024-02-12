import { Navigate, Outlet, useParams } from "react-router-dom";

import { TestsAutoescuelaFast } from "../../config/config";

import { useAuth } from "../../context/UserContext";

// ******* PLANTILLA PARA EVITAR ACCESO A RUTAS CONCRETAS ******* //
const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAuth();
  const { idUser, idTest } = useParams();

  // ******* CONTROLAMOS QUE EL USUARIO ESTE LOGEADO ******* //
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // ******* CONTROLAMOS QUE EL USUARIO NO PUEDA PONER UN ID DIFERENTE AL SUYO CUANDO ESTÉ LOGEADO ******* //
  if (isAuthenticated && idUser != user.id && idUser) return <Navigate to="/" replace />;

  // ******* NO SE PUEDEN ACCEDER A TEST QUE NO EXISTAN ******* //
  if(window.location.pathname == `/test/${idTest}` && !TestsAutoescuelaFast.includes(idTest)) return <Navigate to="/" replace />

  return <Outlet />;
};

export default ProtectedRoute;