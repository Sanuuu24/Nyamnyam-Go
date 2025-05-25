import React from "react";
import { IoIosAdd } from "react-icons/io";

const Menu = () => {

    return (
        <div className="flex justify-evenly flex-wrap w-[60rem] p-5 h-auto gap-y-8 rounded-2xl bg-white">
                    <div
                        className ='`flex flex-col w-[26rem] h-80 p-4 gap-5 rounded-3xl '
                    >
                        <img
                            // src="https://dummyimage.com/360x240/000/fff"
                            alt=""
                            className="rounded-3xl h-52 w-full object-cover"
                        />
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <h1 className="font-semibold text-xl">name</h1>
                                <p className="text-gray-500 ">price</p>
                            </div>
                            <button className="border-2 border-black rounded-full">
                                <IoIosAdd className="text-2xl" />
                            </button>
                        </div>
                    </div>
        </div>
    );
};

export default Menu;
