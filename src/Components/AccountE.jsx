import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import etudiant from '../Asset/etudiant.jpg';

const AccountE = () => {
    const [email, setEmail] = useState('');
    const [Mot_De_Passe, setMot_De_Passe] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3002/authentication_etudiants', {
                email: email,
                Mot_De_Passe: Mot_De_Passe,
            });

            if (response.status === 200) {
                setMessage('Connexion réussie');
                localStorage.setItem('token', response.data.token);
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Erreur de connexion au serveur');
            }
        }
    };

    return (
        <div className="flex flex-row justify-center items-center">
            <div className="pe-8">
                <img src={etudiant} alt="Student" className="w-full rounded-full" />
            </div>
            <div className="w-1/2 pl-40">
                <div className="w-full max-w-sm">
                    <h1 className="text-3xl font-semibold mb-4">Sign Up</h1>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="login" className="text-gray-600">Login</label><br />
                                <input
                                    type='text'
                                    id="login"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="motDePasse" className="text-gray-600">Mot de passe</label><br />
                                <input
                                    type="password"
                                    id="motDePasse"
                                    value={Mot_De_Passe}
                                    onChange={(e) => setMot_De_Passe(e.target.value)}
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                >
                                    Connexion
                                </button>
                            </div>
                        </form>
                    </div>
                    <p className="mt-2 text-red-500">{message}</p>
                    <Link to={`/`} className="mt-4 text-blue-500 hover:underline">Revenir</Link>
                </div>
            </div>
        </div>
    );
};

export default AccountE;
