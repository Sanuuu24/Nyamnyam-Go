import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-5 h-[70px]  rounded-sm bg-slate-200">
            <h1 className="font-semibold text-xl">NyamNyamGo!</h1>
            <Link to="/login" >
                <button className="p-2 w-16 rounded-2xl bg-slate-700 text-white">
                    Login
                </button>
            </Link>
        </nav>
    );
};

export default Navbar;
