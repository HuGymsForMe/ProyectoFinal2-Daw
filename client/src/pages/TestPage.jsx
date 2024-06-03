import { useState, useEffect, lazy } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import { useSeo } from "../hooks/useSeo";

import { API, TestsAutoescuelaFast } from "../config/config";

import { useAuth } from "../context/UserContext";

const QuestionTest = lazy(() => import("../components/TestPage/QuestionTest"))
const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));
const ToastErrors = lazy(() => import("../components/ToastErrors"));
const ModalChecked = lazy(() => import("../components/TestPage/ModalChecked"));

// ******* PÁGINA DE TEST ******* //
function TestPage(){

    const [data, setData] = useState(null); //Preguntas de los test

    const [selectedAnswer, setSelectedAnswer] = useState({}); //Almacena las preguntas contestadas
    const [checked,setChecked] = useState(false); //Comprueba si el test ha sido checkeado

    const [seeModalCorrection, setSeeModalCorrection] = useState(false); //Muestra el modal
    const [showToast, setShowToast] = useState(false); //Muestra el toast

    const [stopwatch, setStopwatch] = useState(1); //Contador para el backend
    const [formatStopwatch, setFormatStopwatch] = useState("00:00"); //Formato del cronómetro

    // ******* ESTADOS PARA PODER PASARLOS AL MODAL ******* //
    const [successes, setSuccesses] = useState(0);
    const [pass, setPass] = useState(false);

    const { idTest } = useParams();
    const { user, setUser } = useAuth();
    const { handleSubmit } = useForm();

    useSeo({
        title: `Test ${TestsAutoescuelaFast.indexOf(idTest)+1} | AutoescuelaFast`,
        description: "Mucha suerte y a por el apto."
    })

    // ******* CRONÓMETRO DEL TEST ******* //
    useEffect(() => {
        let interval;

        // ******* SE INICIA CUANDO COMIENZA EL TEST Y SE PARA CUANDO ESTE FINALIZA ******* //
        if (!checked) {
            interval = setInterval(() => {
                setStopwatch((prevStopwatch) => prevStopwatch + 1);
                const minutes = Math.floor(stopwatch / 60);
                const seconds = stopwatch % 60;
                const format = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
                setFormatStopwatch(format);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [checked, stopwatch]);


    // ******* MUESTRA LAS PREGUNTAS DEL TEST ****** //
    useEffect(() => {
        axios.get(`${API}/test/${idTest}`).then((response) => {
            setData(response.data);
        });
    }, [idTest]);

    // ******* FUNCIÓN QUE SE EJECUTA AL ACABAR EL TEST ******* //
    const onSubmit = async () => {
        const correctAnswers = data.map(ask => ask.correct_answer);
        const userAnswers = Object.values(selectedAnswer);
        const checkedAnswers = userAnswers.map((answer, index) => ({
            userAnswer: answer,
            correctAnswer: correctAnswers[index],
            isCorrect: answer === correctAnswers[index],
        }));

        // ******* COMPRUEBA SI TODAS LAS PREGUNTAS HAN SIDO CONTESTADAS ******* //
        if (checkedAnswers.length < data.length) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            return;
        }

        // ******* DETIENE EL CRONO ******* //
        setChecked(true);

        // ******* CALCULA EL Nº DE PREGUNTAS ACERTADAS ******* //
        let successesCount = 0;
        for (const answer of checkedAnswers) {
            if (answer.isCorrect) successesCount++;
        }
        setSuccesses(successesCount);

        // ******* COMPRUEBA SI EL USUARIO APRUEBA EL TEST ******* //
        const newPass = successesCount >= 27;
        setPass(newPass);
        setSeeModalCorrection(true);

        // ******* AÑADE LA PARTIDA A LA BBDD ******* //
        axios.post(`${API}/game/${idTest}`, {
            time: stopwatch-1,
            successes: successesCount,
            misses: data.length - successesCount,
            pass: newPass,
            user: user.id,
            test: idTest
        });

        // ******* MANDA UN TOAST DE FELICITACIÓN AL USUARIO Y ACTUALIZA EL USUARIO A PREMIUM ******* //
        axios.get(`${API}/gamepremium/${user.id}`)
        .then(response => {
            if(response.data.successPercentage > 30){
                if (!user.premium_user) {
                    axios.put(`${API}/userspremium/${user.id}`, { premium_user: true })
                    .then(response => {
                        setUser({ ...user, premium_user: true });
                        setShowToast(true);
                        setTimeout(() => setShowToast(false), 3000);
                        return;
                    })
                    .catch(error => {
                        console.error("Error al actualizar el estado del usuario:", error);
                    });
                }
            }
        })
        .catch(error => {
            console.error('Error al hacer Premium al usuario', error);
        });
    };

    // ******* PROP PARA EL MODAL ******* //
    const closeModal = () => {
        setSeeModalCorrection(false);
    };

    // ******* PROP PARA EL TOAST ******* //
    const closeToast = () => {
        setShowToast(false);
    };

    if (!data) return null;

    return(
        <>
        <Navbar />
            <p className="text-center text-white absolute right-4 top-[85px] text-3xl font-[Inconsolata]">Tiempo: {formatStopwatch}</p>
            <main className="flex flex-col items-center">
                <h1 className="xl:mt-32 text-bold text-4xl m-8 sm:mt-8 mt-24 text-white">TEST {TestsAutoescuelaFast.indexOf(idTest)+1}</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center bg-slate-200 lg:w-[85%] w-[95%] p-8 rounded-lg mb-8 shadow-lg shadow-slate-700">
                {data.map((ask, i) => (
                    <QuestionTest
                        key={ask._id}
                        number_question={i+1}
                        index_question={30*TestsAutoescuelaFast.indexOf(idTest)+i+1}
                        question={ask.question}
                        first_answer={ask.first_answer}
                        second_answer={ask.second_answer}
                        third_answer={ask.third_answer}
                        correct_answer={ask.correct_answer}
                        checked={checked}
                        setSelectedAnswer={setSelectedAnswer} // Pasa la función para actualizar el estado como prop
                    />
                ))}
                <div className="m-6 p-4 flex justify-end gap-x-4 w-[90%] sm:flex-row flex-col gap-y-2">
                    <Link to={`/tests/${user.id}`} className="bg-[#C21D30] text-white p-4 rounded-lg hover:bg-[#B30519] text-center hover:shadow-xl focus:border-slate-800 border-2">Realizar otro test</Link>
                    <input type="submit" value="Corregir Test" className="bg-sky-500 hover:bg-sky-600 duration-300 p-4 text-center text-white rounded-lg cursor-pointer focus:border-slate-800 border-2" disabled={checked} />
                </div>
                </form>
                { showToast && (
                    <ToastErrors onClose={closeToast} error={true}>Te quedan preguntas sin contestar</ToastErrors>
                ) }
            </main>
            { seeModalCorrection ? <ModalChecked misses={30-successes} pass={pass} format_stopwatch={formatStopwatch} onClose={closeModal} /> : null}
            { showToast && checked && (
                    <ToastErrors className="z-50" onClose={closeToast} error={false}>Felicidades ya eres Usuario Premium!! &#128586;&#128586;</ToastErrors>
                ) }
        <Footer />
        </>
    )
}

export default TestPage;