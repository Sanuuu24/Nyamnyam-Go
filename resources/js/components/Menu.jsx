import React from "react";
import { IoIosAdd } from "react-icons/io";
// import menuList from "../element/menuData";

const Menu = () => {

     const menuList = [
        {
            id: 1,
            name: "menu 1",
            price: 10000,
        },
        {
            id: 2,
            name: "menu 2",
            price: 10000,
        },
        {
            id: 3,
            name: "menu 3",
            price: 10000,
        },
        {
            id: 4,
            name: "menu 4",
            price: 10000,
        },
        {
            id: 5,
            name: "menu 5",
            price: 10000,
        },
        {
            id: 6,
            name: "menu 6",
            price: 10000,
        },
    ];

    return (
        <div className="flex justify-evenly flex-wrap w-[60rem] p-5 h-auto gap-y-8 rounded-2xl bg-white ">
            {menuList.map((menu) => (
                <div
                    key={menu.id}
                    className="flex flex-col w-[26rem] h-80 p-4 gap-5 rounded-3xl bg-gray-300"
                >
                    <img
                        src="https://dummyimage.com/360x240/000/fff"
                        alt=""
                        className="rounded-3xl h-52 w-full object-cover"
                    />
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col ">
                            <h1 className="font-semibold text-xl">
                                {menu.name}{" "}
                            </h1>
                            <p className="text-gray-500 ">{menu.price}</p>
                        </div>
                        <button 
                        // onClick={() => onAddToCart(menu)}
                        className="border-2 border-black rounded-full ">
                            <IoIosAdd className="text-2xl" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Menu;
