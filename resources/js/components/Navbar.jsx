import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (token && user) {
            setIsLoggedIn(true);
            setUserData(JSON.parse(user));
        }
    }, []);

    useEffect(() => {
        const handleClickOutSide = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown;
            }
        };

        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutSide);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        };
    }, [showDropdown]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUserData(null);
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav className="flex justify-between items-center w-full p-5 h-[80px] fixed top-0 rounded-sm z-10 opacity-90 bg-[#08AD1A] ">
            <h1 className="font-semibold text-xl text-white">NyamNyamGo!</h1>
            {isLoggedIn ? (
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={toggleDropdown}
                        className="p-2 rounded-2xl  bg-cyan-900 text-white"
                    >
                        {userData?.name || "User"}
                    </button>
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md p-2">
                        <Link  
                        to={"/add-menu"}
                        >
                        add menu
                        </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <Link to="/login">
                    <button className="p-2 w-20 rounded-2xl bg-slate-700 text-white">
                        Login
                    </button>
                </Link>
            )}
        </nav>
    );
};

export default Navbar;
