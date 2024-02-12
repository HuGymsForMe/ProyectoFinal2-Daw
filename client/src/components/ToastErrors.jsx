import { Snackbar, Alert } from "@mui/material";

import { thirdRed, secondGreen } from "../config/config";


// ******* COMPONENTE QUE CONTIENE MENSAJES DE POSIBLES ERRORES EN LA INTERFAZ DEL USUARIO ******* //
function ToastErrors({ children, onClose, error }) {

    return (
        <Snackbar onClose={onClose}>
          <Alert
            onClose={onClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%', padding: '1.1rem', bottom: '1rem', background: error ? thirdRed : secondGreen }}
          >
            {children}
          </Alert>
        </Snackbar>
    )
}

export default ToastErrors;
