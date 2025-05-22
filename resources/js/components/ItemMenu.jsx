import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
// import menuList from "../element/menuData"

const ItemMenu = () => {
    const [quantity, setQuantity] = useState(0);

    const increment = () => setQuantity((prev) => prev + 1);
    const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

    return (
                <div className="flex justify-between w-full p-2 border-2 rounded-xl shadow-md border-gray-500 ">
                    <div className="flex gap-2">
                        <img
                            src="https://dummyimage.com/75x75/000/fff"
                            className="rounded-xl object-cover"
                        />
                        <h1 className="text-lg font-semibold">nama</h1>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div className="flex items-center gap-2 p-1 rounded-lg bg-gray-300 ">
                            <button onClick={decrement}>
                                <IoIosRemove className="text-xl" />
                            </button>
                            <span>{quantity}</span>
                            <button onClick={increment}>
                                <IoIosAdd className="text-xl" />
                            </button>
                        </div>
                        <button>
                            <FaRegTrashAlt />
                        </button>
                    </div>
                </div>
    );
};

export default ItemMenu;
