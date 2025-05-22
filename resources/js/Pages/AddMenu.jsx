import React from "react";
import { IoIosClose } from "react-icons/io";

const AddMenu = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center border-2 w-auto rounded-2xl gap-5 p-5">
                <div className="flex flex-col p-5 w-full">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-bold">Add Menu</h1>
                        <div className="text-xl">
                            <IoIosClose />
                        </div>
                    </div>
                    <p>your add item menu</p>
                    <form className="flex flex-col gap-5 my-5">
                        <div className="flex gap-5">

                        <div className="flex flex-col gap-2">
                            <label htmlFor="image" className="font-semibold">
                                Image
                            </label>
                            <input
                                type="file"
                                className="border-2 border-gray-200 p-2 rounded-md focus:outline-none focus:border-gray-400 file:h-64 file:w-full file:rounded-lg file:border-0  text-transparent"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="title"
                                    className="font-semibold"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    className="border-2 border-gray-200 p-2 rounded-md focus:outline-none focus:border-gray-400"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="price"
                                    className="font-semibold"
                                >
                                    Price
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    placeholder="Price"
                                    className="border-2 border-gray-200 p-2 rounded-md focus:outline-none focus:border-gray-400"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="description"
                                    className="font-semibold"
                                >
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    placeholder="Description"
                                    className="border-2 border-gray-200 p-2 h-[125px] rounded-md focus:outline-none focus:border-gray-400"
                                    required
                                />
                            </div>
                        </div>
                        </div>
                        
                        <button
                            type="submit"
                            className="bg-slate-900 text-white p-2 rounded-md mt-6 w-full active:scale-95 duration-150"
                            // disabled={loading}
                        >
                            {/* {loading ? "Loading..." : "Login"} */} login
                        </button>
                        
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddMenu;
