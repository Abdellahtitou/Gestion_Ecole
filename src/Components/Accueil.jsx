import React from 'react';
import hello_life from '../Asset/hello_life.jpg';
import admin from '../Asset/admin.jpg';
import etudiant from '../Asset/etudiant.jpg';
import prof from '../Asset/prof.jpg';
import { Link } from 'react-router-dom';

const Accueil = () => {
    return (
        <div className="bg-cover bg-center h-screen" style={{backgroundImage: `url(${require("../Asset/image.jpg")})`}}>
            <div className='flex flex-col justify-center items-center h-full'>
                <div className='mb-8 text-center'>
                    <img src={hello_life} alt="Hello Life" className='w-64 h-64 rounded-full border-4 border-white shadow-md mb-2' />
                    <p className="font-bold text-lg text-white">Hello Life</p>
                </div>
                <div className='flex justify-center items-center'>
                    <ul className='flex space-x-8'>
                        <li className="bg-slate-300 text-center border rounded-lg border-transparent hover:border-blue-500 transition duration-300 overflow-hidden">
                            <Link to='/AccountA'>
                                <img src={admin} alt="Administrateur" className='w-40 h-40 rounded-full transform hover:scale-110 transition duration-300' />
                                <p className="font-medium text-white py-2">Administrateur</p>
                            </Link>
                        </li>
                        <li className="bg-slate-300 text-center border rounded-lg border-transparent hover:border-blue-500 transition duration-300 overflow-hidden">
                            <Link to='/AccountE'>
                                <img src={etudiant} alt="Étudiant" className='w-40 h-40 rounded-full transform hover:scale-110 transition duration-300' />
                                <p className="font-medium text-white py-2">Étudiant</p>
                            </Link>
                        </li>
                        <li className="bg-slate-300 text-center border rounded-lg border-transparent hover:border-blue-500 transition duration-300 overflow-hidden">
                            <Link to='/AccountP'>
                                <img src={prof} alt="Professeur" className='w-40 h-40 rounded-full transform hover:scale-110 transition duration-300' />
                                <p className="font-medium text-white py-2">Professeur</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
    }


export default Accueil;