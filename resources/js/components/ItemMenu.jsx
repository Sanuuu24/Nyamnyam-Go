import React from "react";
import { useSelector } from "react-redux";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { selectCartTotal } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const ItemMenu = ({ cartItems, onRemoveFromCart, onUpdateQuantity }) => {
    const { subtotal, total: totalPrice } = useSelector(selectCartTotal);

    return (
        <div className="flex flex-col w-[26rem] rounded-md p-5 gap-4 bg-slate-100">
            <h1 className="text-2xl font-semibold">Cart Items</h1>

            {cartItems.length === 0 ? (
                <div className="flex justify-center items-center h-32">
                    <p className="text-gray-500">Keranjang kosong</p>
                </div>
            ) : (
                <>
                    <div className="flex flex-col gap-3 max-h-[20rem] overflow-y-auto ">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex h-[7rem] p-3 gap-3 rounded-md bg-slate-200"
                            >
                                <img
                                    src={
                                        item.img_url ||
                                        "https://dummyimage.com/360x240/000/fff"
                                    }
                                    alt={item.products_name}
                                    className="w-20 h-16 rounded-lg object-cover"
                                />
                                <div className="flex flex-col flex-1 justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium">
                                            {item.products_name}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Rp {item.price}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    onUpdateQuantity(
                                                        item.id,
                                                        item.quantity - 1
                                                    )
                                                }
                                                className="bg-slate-300 hover:bg-slate-400 rounded-full p-1"
                                            >
                                                <IoIosRemove className="text-sm" />
                                            </button>
                                            <span className="font-medium">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    onUpdateQuantity(
                                                        item.id,
                                                        item.quantity + 1
                                                    )
                                                }
                                                className="bg-slate-300 hover:bg-slate-400 rounded-full p-1"
                                            >
                                                <IoIosAdd className="text-sm" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() =>
                                                onRemoveFromCart(item.id)
                                            }
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <IoTrashOutline className="text-lg" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-3">
                        <div className="flex flex-col gap-2 mb-2">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center"
                                >
                                    <span className="text-gray-700 text-sm">
                                        {item.products_name}
                                        {item.quantity > 1 && (
                                            <span className="text-gray-700 ml-1">
                                                x{item.quantity}
                                            </span>
                                        )}
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        Rp
                                        {(
                                            item.price * item.quantity
                                        ).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-1 border-t pt-2 mb-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-700">Subtotal:</span>
                                <span className="font-medium">
                                    Rp {subtotal.toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-3 border-t pt-2">
                            <span className="text-lg font-semibold">
                                Total:
                            </span>
                            <span className="text-lg font-semibold">
                                Rp {totalPrice.toLocaleString()}
                            </span>
                        </div>
                        <Link
                            to="/payment"
                            className="block w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors text-center font-medium"
                        >
                            Proceed to Payment
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default ItemMenu;
