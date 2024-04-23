// import { lazy, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";

// import { API } from "../config/config";

// import { useSeo } from "../hooks/useSeo";

// import LogoAutoescuelaFast from "../assets/logo.png";

// const Navbar = lazy(() => import("../components/Navbar"));
// const Footer = lazy(() => import("../components/Footer"));
// const InputCV = lazy (() => import("../components/WorkPage/InputCV"))
// const ToastErrors = lazy(() => import("../components/ToastErrors"));

// function WorkPage() {

//     //TODO: Corregir subida de archivos
//     useSeo({
//         title: `Trabaja con Nosotros | AutoescuelaFast`,
//         description: "Trabaja con nosotros, para ayudar a los más de 3000 alumnos diarios que visitan nuestra web."
//     })

//     const [showToast, setShowToast] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [message, setMessage] = useState(null);
//     const [filesCV, setFilesCV] = useState(null);

//     const {register, handleSubmit, reset} = useForm();

//     const onSubmit = async (data) => {
//         try {

//             const formData = {
//                 name: data.name,
//                 surnames: data.surnames,
//                 email: data.email,
//                 telephone: data.telephone,
//                 files: filesCV.map(file => ({
//                     name: file.name,
//                     data: file.data // Suponiendo que `data` contiene el contenido del archivo
//                 }))
//             };

//             console.log(formData.files)
            
//             await axios.post(`${API}/work`, formData);
//             setMessage("El mensaje se envió correctamente.");
//             reset();
//         } catch (error) {
//             console.log(error);
//         }
//         setShowToast(true);
//         setTimeout(() => {
//             setShowToast(false);
//         }, 3000);
//     };

//     const closeModal = () => {
//         setShowModal(false);
//     }

//     // ******* PROP PARA EL TOAST ******* //
//     const closeToast = () => {
//         setShowToast(false);
//     }

    
//     const onFileChange = (files) => {
//         setFilesCV(files);
//     }

//     return(    
//         <>
//         <Navbar />
//         <main className="flex justify-center items-center flex-col min-h-screen">
//         <section className=" bg-white p-8 flex flex-col gap-y-8 rounded-xl shadow-slate-500 shadow-lg z-10 sm:w-auto w-[90%] md:my-auto my-16">
//             <div className="flex gap-x-10 justify-center sm:flex-row flex-col items-center gap-y-4">
//                 <h1 className="text-3xl text-[#C21D30] text-center">Trabaja con Nosotros</h1>
//                 <img className="sm:w-48 w-40"  src={LogoAutoescuelaFast} alt="Autoescuela Fast" />
//             </div>
//             <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
//                 <div className="flex flex-col">
//                     <label>Nombre:</label>
//                     <input type="text" placeholder="Su nombre" className="rounded-md p-2 bg-slate-200"
//                     {...register("name", {required: true})} />
//                 </div>
//                 <div className="flex flex-col">
//                     <label>Apellidos:</label>
//                     <input type="text" placeholder="Sus apellidos" className="rounded-md p-2 bg-slate-200"
//                     {...register("surnames", {required: true})} />
//                 </div>
//                 <div className="flex flex-col">
//                     <label>Correo electrónico:</label>
//                     <input type="email" placeholder="Su correo electrónico" className="rounded-md p-2 bg-slate-200"
//                     {...register("email", {required: true})} />
//                 </div>
//                 <div className="flex flex-col">
//                     <label>Teléfono Móvil:</label>
//                     <input type="tel" placeholder="Su teléfono" className="rounded-md p-2 bg-slate-200"
//                     {...register("telephone", {required: true})} />
//                 </div>
//                 <div className="flex mt-4 md:flex-row justify-around items-center gap-x-2 gap-y-4 flex-col">
//                     <input type="file" {...register("file", {required: true})}/>
//                     {/*<button type="button" className="bg-[#C21D30] text-white py-2 px-4 rounded-md cursor-pointer hover:shadow-xl hover:bg-[#B30519]" onClick={() => setShowModal(true)}>Subir CV</button>
//                     <div className="flex-col flex">
//                         <p className="text-xl font-semibold">FICHEROS ENVIADOS:</p>
//                         {filesCV && filesCV.map((files, i) => (
//                             <p key={i}>{files.name}</p>
//                         ))}
//                     </div>*/}
//                 </div>
//                 <div className="flex justify-end">
//                     <input type="submit" value="Enviar Información" onSubmit={handleSubmit(onSubmit)} className="bg-[#C21D30] text-white py-2 px-4 rounded-md cursor-pointer hover:shadow-xl hover:bg-[#B30519]" />
//                 </div>
//             </form>
//         </section>
//         {showToast && message && (<ToastErrors onClose={closeToast} error={false}>Se produjo el envío correctamente</ToastErrors>)}
//         {showToast && !message && (<ToastErrors onClose={closeToast} error={true}>No se pudo hacer el envío correctamente</ToastErrors>)}
//         </main>
//         { showModal ? <InputCV onFileChange={(files) => onFileChange(files)} onClose={closeModal} /> : null}
//         <Footer />
//         </>
//     )
// }

// export default WorkPage;


// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import { useForm } from 'react-hook-form';
// import { ThreeDots } from 'react-loader-spinner';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import LogoAutoescuelaFast from "../assets/logo.png";
// import { API } from '../config/config';

// function WorkPage () {
//   const { register, handleSubmit } = useForm();
//   const [loading, setLoading] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("name", data.name);
//       formData.append("surnames", data.surnames);
//       formData.append("email", data.email);
//       formData.append("telephone", data.telephone);
//       formData.append("file", data.file[0]); // Asumiendo que solo se permite un archivo

//       await axios.post(`${API}/work`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       // Reset states 
//       setLoading(false);
//       navigate("/work");
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//     <Navbar />
//     <main className="flex justify-center items-center flex-col min-h-screen">
//     <section className=" bg-white p-8 flex flex-col gap-y-8 rounded-xl shadow-slate-500 shadow-lg z-10 sm:w-auto w-[90%] md:my-auto my-16">
//             <div className="flex gap-x-10 justify-center sm:flex-row flex-col items-center gap-y-4">
//                 <h1 className="text-3xl text-[#C21D30] text-center">Trabaja con Nosotros</h1>
//                 <img className="sm:w-48 w-40"  src={LogoAutoescuelaFast} alt="Autoescuela Fast" />
//             </div>
//             <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
//                 <div className="flex flex-col">
//                     <label>Nombre:</label>
//                     <input type="text" placeholder="Su nombre" className="rounded-md p-2 bg-slate-200"
//                     {...register("name", {required: true})} />
//                 </div>
//                 <div className="flex flex-col">
//                     <label>Apellidos:</label>
//                     <input type="text" placeholder="Sus apellidos" className="rounded-md p-2 bg-slate-200"
//                     {...register("surnames", {required: true})} />
//                 </div>
//                 <div className="flex flex-col">
//                     <label>Correo electrónico:</label>
//                     <input type="email" placeholder="Su correo electrónico" className="rounded-md p-2 bg-slate-200"
//                     {...register("email", {required: true})} />
//                 </div>
//                 <div className="flex flex-col">
//                     <label>Teléfono Móvil:</label>
//                     <input type="tel" placeholder="Su teléfono" className="rounded-md p-2 bg-slate-200"
//                     {...register("telephone", {required: true})} />
//                 </div>
//                 <div className="flex mt-4 md:flex-row justify-around items-center gap-x-2 gap-y-4 flex-col">
//                 <label>Subir CV:</label>
//                 <input type="file" className="rounded-md p-2 bg-slate-200"
//                     {...register("file")} />
//                     {/*<button type="button" className="bg-[#C21D30] text-white py-2 px-4 rounded-md cursor-pointer hover:shadow-xl hover:bg-[#B30519]" onClick={() => setShowModal(true)}>Subir CV</button>
//                     <div className="flex-col flex">
//                         <p className="text-xl font-semibold">FICHEROS ENVIADOS:</p>
//                         {filesCV && filesCV.map((files, i) => (
//                             <p key={i}>{files.name}</p>
//                         ))}
//                     </div>*/}
//                 </div>
//                 <div className="flex justify-end">
//                     <input type="submit" value="Enviar Información" onSubmit={handleSubmit(onSubmit)} className="bg-[#C21D30] text-white py-2 px-4 rounded-md cursor-pointer hover:shadow-xl hover:bg-[#B30519]" />
//                 </div>
//             </form>
//         </section>
//       {
//         loading && <ThreeDots
//           height="80"
//           width="80"
//           radius="9"
//           color="#4fa94d"
//           ariaLabel="three-dots-loading"
//           wrapperStyle={{}}
//           wrapperClassName=""
//           visible={true}
//         />
//       }
//     </main>
//     <Footer />
//     </>
//   )
// }

// export default WorkPage;