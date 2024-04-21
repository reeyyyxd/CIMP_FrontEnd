import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('/src/assets/images/citlogo.png')` }}>
        <div>
        <div className="mb-8 text-xl font-bold text-black drop-shadow-2xl">Inventory Management Portal</div>
        <div className="w-96 max-w-xs bg-red-900 bg-opacity-90 rounded p-5 shadow-2xl"> 
            <form>
            <div>
            <label className="block mb-2 text-white text-left" htmlFor="username">Username</label>
            <input className="w-full p-2 mb-6 text-white border border-black rounded-full outline-none focus:bg-gray-300" type="text" name="username" id="username" />
            </div>
            <div>
            <label className="block mb-2 text-white text-left" htmlFor="password">Password</label>
            <input className="w-full p-2 mb-6 text-white border border-black rounded-full outline-none focus:bg-gray-300" type="password" name="password" id="password" />
            </div>
            <div>
            <input className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 mb-6 rounded-full" type="submit" value="Login" 
            onClick={() => navigate("/home")}/>
            </div>
            </form>
            </div>
            </div>
        </div>
    );
}
