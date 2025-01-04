import React from "react";
import icon from '../Asset/icon.jpg';
import { Link } from "react-router-dom";

const Etudiant = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-semibold">Welcome</h1>
                <img src={icon} alt="icon" className="w-24 h-24 mt-4 rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline">
                    Notes
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline">
                    Absence
                </button>
            </div>
            <Link to={`/`} className="mt-8 text-blue-500 hover:underline">Revenir</Link>
        </div>
    );
}

export default Etudiant;
