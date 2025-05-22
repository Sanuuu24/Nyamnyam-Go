import Navbar from "../components/Navbar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import React from "react";
import Menu from "../components/Menu"
import ItemMenu from "../components/ItemMenu";

const Home = () => {
    return (
        <>
            <Navbar />
            <main className="flex h-full bg-gray-300">
                <div className="flex flex-col gap-5 p-7">
                    {/*category */}
                    <div className="flex flex-col h-[19rem] w-[60rem] rounded-xl bg-white">
                        <header className="flex justify-between items-center p-4 ">
                            <h1 className="font-semibold text-xl">
                                Foods Menu
                            </h1>
                            <div className="flex gap-2 text-gray-700 text-sm">
                                <FaArrowLeft />
                                <FaArrowRight />
                            </div>
                        </header>
                        <div className="overflow-x-auto overflow-y-hidden ">
                            <div className="flex space-x-5 w-max p-5 ">
                                {/* di bagian ini buat effek saat img di clik menu type nya muncul okey! */}
                                <div className="flex justify-between w-60 h-52 rounded-3xl p-3 bg-gray-300">
                                    menu pake img
                                    <input type="checkbox"  className="focus:outline-none focus:ring-2 focus:ring-gray-500 "/>
                                </div>
                                <div className="w-60 h-52 rounded-3xl p-3 bg-gray-300">
                                    menu pake img
                                </div>
                                <div className="w-60 h-52 rounded-3xl p-3 bg-gray-300">
                                    menu pake img
                                </div>
                                <div className="w-60 h-52 rounded-3xl p-3 bg-gray-300">
                                    menu pake img
                                </div>
                                <div className="w-60 h-52 rounded-3xl p-3 bg-gray-300">
                                    menu pake img
                                </div>
                                <div className="w-60 h-52 rounded-3xl p-3 bg-gray-300">
                                    menu pake img
                                </div>
                                
                                
                            </div>
                        </div>
                    </div>

                    <Menu />

                </div>
                <div className="flex flex-col my-7 h-[47rem] w-[30rem] p-5 gap-5 rounded-xl bg-white ">
                    <h1 className="text-2xl font-semibold">items</h1>
                    <ItemMenu/>
                </div>
            </main>
        </>
    );
};

export default Home;
