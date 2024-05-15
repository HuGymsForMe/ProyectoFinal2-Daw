import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/UserContext';

import LogoAutoescuelaFast from "../assets/logo.png";

// ******* CABECERA ******* //
function Navbar() {

    const [menuToggle, setMenuToggle] = useState(false); //Estado para el desplegable del menú
    const [fontSizeLinks, setFontSizeLinks] = useState("text-sm"); //Estado para modificar el tamaño de los textos

    const { isAuthenticated, user } = useAuth();

    const toggleMenu = () => {
        setMenuToggle(!menuToggle);
    };

    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1280 && screenWidth < 1536) {
          setFontSizeLinks("text-sm");
        } else {
          setFontSizeLinks("text-md");
        }
    }, []);

    return (
      <header className="bg-slate-200 z-30 xl:fixed xl:w-full">
        <nav className="flex justify-between items-center w-[92%] mx-auto p-3 z-30">
            <div className='z-40'>
                <Link to={"/"}>
                    <img className="sm:w-64 w-32 cursor-pointer"  src={LogoAutoescuelaFast} alt="Logo AutoescuelaFast" />
                </Link>
            </div>
            <div className={`nav-links duration-1000 xl:static absolute bg-slate-200 xl:min-h-fit min-h-[100vh] left-0 ${menuToggle ? 'top-[7%] sm:top-[8%] md:top-[5%]' : ''} top-[-400%] xl:w-auto w-full flex items-center justify-center px-5 z-20`}>
                <ul className='flex xl:flex-row flex-col xl:items-center md:gap-[4vw] gap-8'>
                    <li className='text-center hover:scale-110 duration-500'>
                        <Link className={`hover:text-[#C21D30] cursor-pointer ${fontSizeLinks}`} to={`/`} onClick={() => {setMenuToggle(false)}}>Inicio</Link>
                    </li>
                    <li className='text-center hover:scale-110 duration-500'>
                        <Link className={`hover:text-[#C21D30] cursor-pointer ${fontSizeLinks}`} to={isAuthenticated ? `/tests/${user.id}` : "/login"} onClick={() => {setMenuToggle(false)}}>Realizar Test</Link>
                    </li>
                    <li className='text-center hover:scale-110 duration-500'>
                        <Link className={`hover:text-[#C21D30] cursor-pointer ${fontSizeLinks}`} to={`/contact`} onClick={() => {setMenuToggle(false)}}>Contáctanos</Link>
                    </li>
                    <li className='text-center hover:scale-110 duration-500'>
                        <Link className={`hover:text-[#C21D30] cursor-pointer ${fontSizeLinks}`} to={`/work`} onClick={() => {setMenuToggle(false)}}>Trabaja con Nosotros</Link>
                    </li>
                    <li className='text-center hover:scale-110 duration-500'>
                        <Link className={`hover:text-[#C21D30] cursor-pointer ${fontSizeLinks}`} to={`/we-are`} onClick={() => {setMenuToggle(false)}}>¿Quiénes Somos?</Link>
                    </li>
                </ul>
            </div>
            <div className='flex items-center gap-4 z-40'>
                {isAuthenticated ? (
                    <Link to={`/profile/${user.id}`} onClick={() => {setMenuToggle(false)}}>
                        <button type='button' className={`bg-[#C21D30] text-white px-4 py-2 rounded-full hover:bg-[#B30519] border-[#999] sm:text-base text-xs focus:border-slate-800 border-2 flex gap-x-[.25rem]`}>
                            <p className="flex justify-center items-center">{user.username}</p>
                            <p className="flex justify-center items-center p-[.25rem]"><ion-icon name="person" aria-label="iconUser"></ion-icon></p>
                        </button>
                    </Link>
                ) : (
                    <Link to={`/login`} onClick={() => {setMenuToggle(false)}}>
                        <button type='button' className={`bg-[#C21D30] text-white px-5 py-2 rounded-full hover:bg-[#B30519] sm:text-base text-xs focus:border-slate-800 border-2`}>Iniciar Sesión</button>
                    </Link>
                )}
                <button className="text-3xl cursor-pointer xl:hidden flex justify-center items-center" onClick={toggleMenu} role='presentation' aria-label='toggleButton'>
                    <ion-icon name={menuToggle ? "close" : "menu-outline"} aria-label='toggleIcon'></ion-icon>
                </button>
            </div>
        </nav>
      </header>
    )
  }
  
  export default Navbar;
  