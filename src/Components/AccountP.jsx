import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import prof from '../Asset/prof.jpg';

const AccountP = () => {
    const [Email, setEmail] = useState("");
    const [Mot_De_Passe, setMot_De_Passe] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleInscription = async () => {
        try {
            const response = await fetch('http://localhost:5000/authentication_Professeurs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: Email, Mot_De_Passe })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); 
                navigate('/Professeur');
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            setError('Erreur réseau');
        }
    };
    return (
        <div className="flex flex-row justify-center items-center">
            <div className="pe-10">
                <img src={prof} alt="Professseur" className="w-full rounded-full" />
            </div>
            <div className="w-1/2 pl-40">
                <div className="w-full max-w-sm">
                    <h1 className="text-3xl font-semibold mb-4">Sign Up</h1>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-4">
                            <label htmlFor="login" className="text-gray-600">Email</label><br />
                            <input
                                type="text"
                                id="login"
                                value={Email}
                                onChange={e => setEmail(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="text-gray-600">Mot de passe</label><br />
                            <input
                                type="password"
                                id="password"
                                value={Mot_De_Passe}
                                onChange={e => setMot_De_Passe(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full"/>
                        </div>
                        <div className="mb-4">
                            <button
                                type="submit"
                                onClick={handleInscription}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                                Connexion
                            </button>
                            {error && <div className="text-red-500 mt-4 text-sm">{error}</div>}
                        </div>
                    </div>
                    <Link to={`/`} className="mt-4 text-blue-500 hover:underline">Revenir</Link>
                </div>
            </div>
        </div>
    );
}

export default AccountP;
