import React from 'react';

export default function Login() {
    return (
        <div className="flex h-screen bg-red-900">
            <div className="w-full max-w-xs m-auto bg-white rounded p-5">
                <header>
                    <img className="w-20 mx-auto mb-5" src="/images/citlogo.png" alt="CIT Logo" />
                </header> 
                <form>
                    <div>
                        <label className="block mb-2" htmlFor="username">Username</label>
                        <input className="w-full p-2 mb-6 text-black border border-black rounded-full outline-none focus:bg-gray-300" type="text" name="username" id="username" />
                    </div>
                    <div>
                        <label className="block mb-2" htmlFor="password">Password</label>
                        <input className="w-full p-2 mb-6 text-maroon-700 border border-black rounded-full outline-none focus:bg-gray-300" type="password" name="password" id="password" />
                    </div>
                    <div>
                    <input className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 mb-6 rounded-full" type="submit" value="Login" />
                    </div>
                </form>
            </div>
        </div>
    );
}
