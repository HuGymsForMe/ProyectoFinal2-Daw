import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/UserContext';

import LogoAutoescuelaFast from "../assets/logo.png";

// ******* CABECERA ******* //
function Navbar() {

    const [menuToggle, setMenuToggle] = useState(false);
    const { isAuthenticated, user } = useAuth();

    const toggleMenu = () => {
        setMenuToggle(!menuToggle);
    };

    return (
      <header className="bg-slate-200 z-30">
        <nav className="flex justify-between items-center w-[92%] mx-auto p-3 z-30">
            <div>
                <Link to={"/"}>
                    <img className="sm:w-64 w-32 cursor-pointer"  src={LogoAutoescuelaFast} alt="Logo AutoescuelaFast" />
                </Link>
            </div>
            <div className={`nav-links duration-500 lg:static absolute bg-slate-200 lg:min-h-fit min-h-[100vh] left-0 ${menuToggle ? 'top-[7%]' : ''} top-[-400%] lg:w-auto w-full flex items-center justify-center px-5 z-20`}>
                <ul className='flex lg:flex-row flex-col lg:items-center md:gap-[4vw] gap-8'>
                    <li className='text-center hover:scale-110 duration-500'>
                        <Link className={`hover:text-[#C21D30] cursor-pointer`} to={`/`} onClick={() => {setMenuToggle(false)}}>Inicio</Link>
                    </li>
                    <li className='text-center hover:scale-110 duration-500'>
                        <Link className={`hover:text-[#C21D30] cursor-pointer`} to={isAuthenticated ? `/tests/${user.id}` : "/login"} onClick={() => {setMenuToggle(false)}}>Realizar Test</Link>
                    </li>
                    {/* <li className='text-center hover:scale-110 duration-500'>
                        <Link className={`hover:text-[#C21D30] cursor-pointer`} to={`/news`} onClick={() => {setMenuToggle(false)}}>Noticias</Link>
                    </li> */}
                    <li className='text-center hover:scale-110 duration-500'>
                        <Link className={`hover:text-[#C21D30] cursor-pointer`} to={`/contact`} onClick={() => {setMenuToggle(false)}}>Contáctanos</Link>
                    </li>
                    <li className='text-center hover:scale-110 duration-500'>
                        <Link className={`hover:text-[#C21D30] cursor-pointer`} to={`/work`} onClick={() => {setMenuToggle(false)}}>Trabaja con Nosotros</Link>
                    </li>
                </ul>
            </div>
            <div className='flex items-center gap-6'>
                {isAuthenticated ? (
                    <Link to={`/profile/${user.id}`} onClick={() => {setMenuToggle(false)}}>
                        <button type='button' className={`bg-[#C21D30] text-white px-4 py-2 rounded-full hover:bg-[#B30519] sm:text-base text-xs focus:border-slate-800 border-2 flex gap-x-[.25rem]`}>
                            <p className="flex justify-center items-center">{user.username}</p>
                            <p className="flex justify-center items-center p-[.25rem]"><ion-icon name="person"></ion-icon></p>
                        </button>
                    </Link>
                ) : (
                    <Link to={`/login`} onClick={() => {setMenuToggle(false)}}>
                        <button type='button' className={`bg-[#C21D30] text-white px-5 py-2 rounded-full hover:bg-[#B30519] sm:text-base text-xs focus:border-slate-800 border-2`}>Iniciar Sesión</button>
                    </Link>
                )}
                <button className="text-3xl cursor-pointer lg:hidden" onClick={toggleMenu}>
                    <ion-icon name={menuToggle ? "close" : "menu-outline"}></ion-icon>
                </button>
            </div>
        </nav>
      </header>
    )
  }
  
  export default Navbar;
  