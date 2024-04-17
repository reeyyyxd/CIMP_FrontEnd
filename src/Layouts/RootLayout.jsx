import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {
    return (
        <>
            <p className="font-bold inline ml-11">CIMP</p>
            
            <nav className="inline">
                <NavLink to='/'><button className="ml-[1080px] underline" type="button">Home</button></NavLink>
                <NavLink to='about'><button className="ml-[10px] underline" type="button">About</button></NavLink>
                <NavLink to='login'><button className="ml-[10px] underline" type="button">Login</button></NavLink>
            </nav>

            <Outlet /> 
        </>
    )
}
