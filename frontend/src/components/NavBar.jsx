import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const NavBar = () => {
    const [visible, setVisible] = useState(false);
    const {setShowSearch, getCartCount, token, setToken, navigate} = useContext(ShopContext);

    const handleLogout = () => {
      setToken("");
      localStorage.removeItem("token");
      navigate("/");
    };

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <Link to='/'>
            <img src={assets.logo} className='w-36' alt="Trendify" />
        </Link>
        <ul className='hidden gap-5 text-sm text-gray-700 sm:flex'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>ACCUEIL</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>À PROPOS</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
        </ul>
        <div className='flex items-center gap-6'>
            <img 
                onClick={() => setShowSearch(true)} 
                src={assets.search_icon} 
                className='w-5 cursor-pointer' 
                alt="Rechercher" 
                title="Rechercher des produits"
            />
            <div className='relative group'>
                <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="Votre Profil" title="Mon Profil" />
                <div className='absolute right-0 hidden pt-4 group-hover:block dropdown-menu z-50'>
                    <div className='flex flex-col gap-2 px-5 py-3 text-gray-500 rounded w-40 bg-slate-100 shadow-lg'>
                        {token ? (
                          <>
                            <Link to='/orders' className='cursor-pointer hover:text-black hover:font-semibold transition-all'>
                              📦 Mes Commandes
                            </Link>
                            <hr className='border-gray-300' />
                            <p onClick={handleLogout} className='cursor-pointer hover:text-red-600 hover:font-semibold transition-all'>
                              🚪 Se Déconnecter
                            </p>
                          </>
                        ) : (
                          <>
                            <Link to='/login' className='cursor-pointer hover:text-black hover:font-semibold transition-all'>
                              🔐 Se Connecter
                            </Link>
                            <hr className='border-gray-300' />
                            <Link to='/login' className='cursor-pointer hover:text-black hover:font-semibold transition-all'>
                              ✍️ Créer un Compte
                            </Link>
                          </>
                        )}
                    </div>
                </div>
            </div>
            <Link to='/cart' className='relative'>
                <img src={assets.cart_icon} className='w-5 min-w-5' alt="Panier" title="Mon Panier" />
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link>
            <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="Menu" />
        </div>
        
        {/* Menu mobile */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer border-b'>
                    <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="Fermer" />
                    <p className='font-semibold'>Fermer</p>
                </div>
                <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b' to='/'>🏠 ACCUEIL</NavLink>
                <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b' to='/collection'>👗 COLLECTION</NavLink>
                <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b' to='/about'>ℹ️ À PROPOS</NavLink>
                <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b' to='/contact'>📞 CONTACT</NavLink>
                <div className='py-3 pl-6 border-b'>
                    {token ? (
                        <>
                            <NavLink onClick={() => setVisible(false)} className='block mb-2' to='/orders'>📦 Mes Commandes</NavLink>
                            <p onClick={() => {
                                setVisible(false);
                                handleLogout();
                            }} className='cursor-pointer text-red-600 font-semibold'>🚪 Se Déconnecter</p>
                        </>
                    ) : (
                        <>
                            <NavLink onClick={() => setVisible(false)} className='block mb-2' to='/login'>🔐 Se Connecter</NavLink>
                            <NavLink onClick={() => setVisible(false)} className='block' to='/login'>✍️ Créer un Compte</NavLink>
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default NavBar
