import React, { useState  } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import admin from '../Asset/admin.jpg';

const AccountA = () => {
    const [Email, setEmail] = useState("");
    const [Mot_De_Passe, setMot_De_Passe] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleInscription = () => {

        if (Email === 'admin@gmail.com' && Mot_De_Passe === '12345') {
    
          navigate('/Administrateur');
        } else {
    
          setError('Email ou mot de passe incorrect');
    
        }
      };
    

    return (
        <div className="flex flex-row justify-center items-center">
            <div className="pe-8">
                <img src={admin} alt="Administrateur" className="w-full rounded-full " />
            </div>
            <div className="w-1/2 pl-40">
                <div className="w-full max-w-sm">
                    <h1 className="text-3xl font-semibold mb-4">Inscription</h1>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="email" className="text-gray-600">Email</label><br />
                                <input type='text' id="email" value={Email} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full" onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="text-gray-600">Mot de passe</label><br />
                                <input type="password" id="password" value={Mot_De_Passe} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full" onChange={e => setMot_De_Passe(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <button type="submit" onClick={handleInscription} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                                    connexion
                                </button>
                                {error && <div>{error}</div>}
                                

                            </div>
                        </form>
                    </div>
                    <Link to={`/`} className="mt-4 text-blue-500 hover:underline">Revenir</Link>
                </div>
            </div>
        </div>
    );
}

export default AccountA;
