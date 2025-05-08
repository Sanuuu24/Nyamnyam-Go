import Navbar from "../components/Navbar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import React from "react";

const Home = () => {
    return (
        <>
            <Navbar />
            <main className="flex gap-5 ">
                <div className="flex flex-col gap-5 p-7">
                    {/*category */}
                    <div className="flex flex-col h-72 w-[60rem] rounded-xl bg-white">
                        <header className="flex justify-between items-center p-4 ">
                            <h1 className="font-semibold text-xl">
                                Foods Menu
                            </h1>
                            <div className="flex gap-2 text-gray-700 text-sm">
                                <FaArrowLeft />
                                <FaArrowRight />
                            </div>
                        </header>
                        <div className="flex gap-5 p-4 overflow-x-auto">
                            <div className="w-48 h-48 rounded-xl bg-gray-300"> menu pake img</div>
                            <div className="w-48 h-48 rounded-xl bg-gray-300"> menu pake img</div>
                            <div className="w-48 h-48 rounded-xl bg-gray-300"> menu pake img</div>
                            <div className="w-48 h-48 rounded-xl bg-gray-300"> menu pake img</div>
                        </div>
                    </div>

                    <div>main</div>
                </div>
            </main>
        </>
    );
};

export default Home;
