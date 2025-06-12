import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import ItemMenu from "../components/ItemMenu";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import {
    fetchProducts,
    fetchProductTypes,
    setSelectedType,
    selectProductTypes,
    selectSelectedType,
    selectProductLoading
} from '../redux/slices/productSlice';
import {
    selectCartItems,
    addToCart,
    removeFromCart,
    updateQuantity
} from '../redux/slices/cartSlice';

const Home = () => {
    const dispatch = useDispatch();
    
    const productTypes = useSelector(selectProductTypes);
    const selectedType = useSelector(selectSelectedType);
    const loading = useSelector(selectProductLoading);
    const cartItems = useSelector(selectCartItems);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchProductTypes());
    }, [dispatch]);

    const handleTypeFilter = (typeId) => {
        dispatch(setSelectedType(typeId));
        console.log("selected type", typeId);
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleUpdateQuantity = (productId, newQuantity) => {
        dispatch(updateQuantity({ productId, quantity: newQuantity }));
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="flex mt-[80px] p-5">
                    <div className="flex justify-center items-center w-full h-64">
                        <p>Loading...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="flex justify-evenly mt-[80px] p-5 gap">
                {/*main menu*/}
                <div className="flex justify-between">
                    <div className="flex flex-col w-[65rem] p-5 gap-5 rounded-xl bg-slate-100">
                        <div className="flex justify-start gap-5">
                            <button
                                onClick={() => handleTypeFilter("all")}
                                className={`p-2 text-lg rounded-xl transition-colors ${
                                    selectedType === "all"
                                        ? "bg-slate-500 text-white"
                                        : "bg-slate-300 hover:bg-slate-400"
                                }`}
                            >
                                All Menu
                            </button>
                            {productTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() =>
                                        handleTypeFilter(type.id)
                                    }
                                    className={`p-2 text-lg rounded-xl transition-colors ${
                                        selectedType === type.id
                                            ? "bg-slate-500 text-white"
                                            : "bg-slate-300 hover:bg-slate-400"
                                    }`}
                                >
                                    {type.type_name}
                                </button>
                            ))}
                        </div>
                        <Menu onAddToCart={handleAddToCart} />
                    </div>
                </div>
                {/*sidebar*/}
                <ItemMenu
                    cartItems={cartItems}
                    onRemoveFromCart={handleRemoveFromCart}
                    onUpdateQuantity={handleUpdateQuantity}
                />
            </div>
        </>
    );
};

export default Home;