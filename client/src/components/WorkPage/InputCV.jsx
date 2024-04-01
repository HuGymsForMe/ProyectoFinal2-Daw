import { useRef, useState } from "react";
import PropTypes from "prop-types";

import { useForm } from "react-hook-form";

import uploadImg from "../../assets/fileinput/cloud-upload-regular-240.png";

import "../../styles/InputCV.css";
import { ImageConfig } from "../../config/config";

const inputCV = ({onFileChange, onClose})  => {

    const wrapperRef = useRef(null);
    const [fileList, setFileList] = useState([]);
    const {register} = useForm();

    const onDragEnter = () => wrapperRef.current.classList.add("dragover");
    const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
    const onDrop = () => wrapperRef.current.classList.remove("dragover");

    const onFileDrop = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileData = event.target.result;
                setFileList([{ data: fileData, name: selectedFile.name }]);
                onFileChange([{ data: fileData, name: selectedFile.name }]);
            };
            reader.readAsDataURL(selectedFile);
        }
    };
    
    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        onFileChange(updatedList);
    }

    return(
        <div className="modal-overlay z-30">
            <section className="modal bg-white p-4 flex flex-col gap-y-8 rounded-xl shadow-slate-500 shadow-lg z-10">
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-2xl header text-[#B30519] mb-4 text-center">
                    Sube aquí tu CV
                </h2>
                <div className='drop-file-input' 
                    ref={wrapperRef} 
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                >
                    <div className='drop-file-input__label flex flex-col justify-center items-center'>
                        <img src={uploadImg} alt="..." />
                        <p className="text-center text-[#B30519]">Sube tus ficheros aquí</p>
                    </div>
                    <input type="file" onChange={onFileDrop} multiple />
                </div>
                {
                    fileList.length > 0 ? (

                            <div className="drop-file-preview flex-col p-2">
                                <p className="drop-file-preview__title">
                                    Archivos subidos:
                                </p>
                                {
                                    fileList.map((item, index) => (
                                        <div key={index} className="drop-file-preview__item">
                                            <img src={ImageConfig[item.name.split('.').pop()] || ImageConfig['default']} alt="" />
                                            <div className="drop-file-preview__item__info">
                                                <div className="flex flex-col">
                                                    <p>{item.name}</p>
                                                    <p>{item.size}B</p>
                                                    <p onClick={() => fileRemove(item)} className="drop-file-preview__item__del text-[#C21D30] cursor-pointer">Eliminar Archivo</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                    ) : null
                }
                <button className="bg-[#C21D30] text-white py-2 px-4 rounded-md cursor-pointer hover:shadow-xl hover:bg-[#B30519] mt-8" onClick={onClose}>Subir CV</button>
            </div>  
            <button className="close-button" onClick={onClose}>
                <p className="text-4xl"><ion-icon name="close"></ion-icon></p>
            </button>    
            </section>
        </div>
    )
}

inputCV.propTypes = {
    onFileChange: PropTypes.func
}

export default inputCV;