import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('/src/assets/images/citlogo.png')` }}>
            <div>
                <div className="w-96 max-w-xs bg-red-900 bg-opacity-90 rounded p-5 shadow-2xl"> 
                <form>
                        <div className="mb-4">
                            <h2 className="text-white text-center text-2xl font-bold mb-2 inline-block">Inventory Management Portal</h2>
                        </div>  
                        <div class="grid gap-6 mb-6 md:grid-cols-1"> 
                            <input
                                type="text"
                                name="userName"
                                // value={Password}
                                // onChange={Username}
                                placeholder="Username"
                                required
                                className="mr-2 border border-gray-300 rounded-full px-3 py-2"
                            />       
                            <input
                                type="text"
                                name="Password"
                                // value={Password}
                                // onChange={Password}
                                placeholder="Password"
                                required
                                className="mr-2 border border-gray-300 rounded-full px-3 py-2"
                            />
                        <div>
                            <input className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
                             type="submit" 
                             value="Login" 
                             onClick={() => navigate("/home")}/>
                        </div>
                        </div>
                    </form>
                </div>
            </div>       
        </div>
    );
}
