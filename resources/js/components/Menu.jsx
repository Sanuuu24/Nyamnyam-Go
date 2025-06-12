import React from "react";
import { useSelector } from 'react-redux';
import { IoIosAdd } from "react-icons/io";
import { selectFilteredProducts } from '../redux/slices/productSlice';

const Menu = ({ onAddToCart }) => {
    const filteredProducts = useSelector(selectFilteredProducts);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
                <div
                    key={product.id}
                    className="flex flex-col w-[20rem] min-h-80 max-h-96 p-2 rounded-3xl bg-white shadow-md overflow-hidden"
                >
                    <div className="relative">
                        <img
                            src={product.img_url}
                            alt={product.products_name}
                            className="rounded-3xl h-52 w-full object-cover"
                        />
                        <button
                            onClick={() => onAddToCart(product)}
                            className="absolute top-2 right-2 border-2 border-slate-300 bg-slate-100 rounded-full p-1 shadow-md "
                        >
                            <IoIosAdd className="text-2xl" />
                        </button>
                    </div>
                    <div className="flex flex-col p-3 space-y-2">
                        <div className="flex justify-between items-center">
                            <h1 className="font-semibold text-xl">
                                {product.products_name}
                            </h1>
                            <h1 className="font-semibold text-xl">
                                Rp {product.price}
                            </h1>
                        </div>
                        <p className="text-gray-500 text-sm">
                            {product.description}
                        </p>
                        <p className="text-sm text-gray-400">
                            Stock: {product.stock}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Menu;