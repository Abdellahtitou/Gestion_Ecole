import React from "react";
import admin from '../Asset/admin.jpg';
import { Link } from "react-router-dom";

const Professeur = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-semibold">Bienvenue</h1>
                <img src={admin} alt="icon" className="w-24 h-24 mt-4 rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/AjouterAbsence">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline">
                        Ajouter l'absence
                    </button>
                </Link>
                <Link to="/ajouterNote">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline">
                        Ajouter les Notes
                    </button>
                </Link>
            </div>
            <Link to={`/AccountP`} className="mt-8 text-blue-500 hover:underline">Retour</Link>
        </div>
    );
}

export default Professeur;
