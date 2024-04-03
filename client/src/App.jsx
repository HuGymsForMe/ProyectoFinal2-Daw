import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// ******* CONTEXTOS DE LA APLICACIÓN ******* //
import { UserProvider } from "./context/UserContext";

const LoadingPage = lazy(() => import("./pages/LoadingPage"))
const ProtectedRoute = lazy(() => import("./pages/private/ProtectedRoute"))

// ******* PLANTILLAS QUE COMPONEN LA APLICACIÓN ******* //
const HomePage = lazy(() => import("./pages/HomePage"));
const TestsPage = lazy(() => import("./pages/TestsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const TestPage = lazy(() => import("./pages/TestPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const WorkPage = lazy(() => import("./pages/WorkPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

function App() {

return (
  <UserProvider>
    <BrowserRouter>
        <Suspense fallback={<LoadingPage/>}>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/tests/:idUser" element={<TestsPage />}></Route>
            <Route path="/contact" element={<ContactPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/work" element={<WorkPage />}></Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/test/:idTest" element={<TestPage />}></Route>
              <Route path="/profile/:idUser" element={<ProfilePage />}></Route>
              <Route path="/tests/:idUser" element={<TestsPage />}></Route>
            </Route>
          </Routes> 
        </Suspense>
    </BrowserRouter>
  </UserProvider>

)
}

export default App;
