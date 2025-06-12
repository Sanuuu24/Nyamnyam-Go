import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import {
    fetchProductTypes,
    selectProductTypes,
    selectProductLoading,
    selectProductError,
} from "../redux/slices/productSlice";

const AddMenu = () => {
    const dispatch = useDispatch();
    const productTypes = useSelector(selectProductTypes);
    const isLoading = useSelector(selectProductLoading);
    const error = useSelector(selectProductError);

    const [formData, setFormData] = useState({
        products_name: "",
        description: "",
        price: "",
        stock: "",
        product_type_id: "",
        img_url: null,
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (productTypes.length === 0) {
            dispatch(fetchProductTypes());
        }
    }, [dispatch, productTypes.length]);

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            const file = files[0];
            setFormData((prev) => ({
                ...prev,
                [name]: file,
            }));

            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                setImagePreview(null);
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("products_name", formData.products_name);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("price", formData.price);
            formDataToSend.append("stock", formData.stock);
            formDataToSend.append("product_type_id", formData.product_type_id);
            if (formData.img_url) {
                formDataToSend.append("img_url", formData.img_url);
            }

            const response = await fetch("/api/product", {
                method: "POST",
                body: formDataToSend,
                headers: {
                    Accept: "application/json",
                },
            });

            const result = await response.json();

            if (response.ok) {
                setMessage({
                    type: "success",
                    text: result.message || "Product created successfully!",
                });
                setFormData({
                    products_name: "",
                    description: "",
                    price: "",
                    stock: "",
                    product_type_id: "",
                    img_url: null,
                });
                setImagePreview(null);
            } else {
                setMessage({
                    type: "error",
                    text: result.message || "Failed to create product",
                });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Network error occurred" });
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="flex flex-col justify-center items-center border-2 border-gray-200 w-full max-w-4xl rounded-2xl gap-5 p-6 bg-white shadow-lg">
                <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Add Menu
                        </h1>
                        <button
                            onClick={handleBack}
                            className="text-2xl text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <IoIosClose />
                        </button>
                    </div>
                    <p className="text-gray-600 mb-6">
                        Add a new item to your menu
                    </p>

                    {message.text && (
                        <div
                            className={`p-4 rounded-md mb-4 ${
                                message.type === "success"
                                    ? "bg-green-50 text-green-700 border border-green-200"
                                    : "bg-red-50 text-red-700 border border-red-200"
                            }`}
                        >
                            {message.text}
                        </div>
                    )}

                    {error && (
                        <div className="p-4 rounded-md mb-4 bg-red-50 text-red-700 border border-red-200">
                            Error loading categories: {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                            <div className="flex flex-col gap-2 lg:w-1/3">
                                <label
                                    htmlFor="img_url"
                                    className="font-semibold text-gray-700"
                                >
                                    Product Image
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        name="img_url"
                                        id="img_url"
                                        accept="image/*"
                                        onChange={handleInputChange}
                                        className="border-2 border-gray-200 p-2 rounded-md focus:outline-none focus:border-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 w-full"
                                        required
                                    />
                                </div>
                                {imagePreview && (
                                    <div className="mt-2">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-48 object-cover rounded-md border-2 border-gray-200"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-4 lg:w-2/3">
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="products_name"
                                        className="font-semibold text-gray-700"
                                    >
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        name="products_name"
                                        id="products_name"
                                        placeholder="Enter product name"
                                        value={formData.products_name}
                                        onChange={handleInputChange}
                                        className="border-2 border-gray-200 p-3 rounded-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex flex-col gap-2 flex-1">
                                        <label
                                            htmlFor="price"
                                            className="font-semibold text-gray-700"
                                        >
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            id="price"
                                            placeholder="0"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            min="0"
                                            step="500"
                                            className="border-2 border-gray-200 p-3 rounded-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 flex-1">
                                        <label
                                            htmlFor="stock"
                                            className="font-semibold text-gray-700"
                                        >
                                            Stock
                                        </label>
                                        <input
                                            type="number"
                                            name="stock"
                                            id="stock"
                                            placeholder="0"
                                            value={formData.stock}
                                            onChange={handleInputChange}
                                            min="0"
                                            className="border-2 border-gray-200 p-3 rounded-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="description"
                                        className="font-semibold text-gray-700"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        placeholder="Enter product description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="border-2 border-gray-200 p-3 rounded-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 resize-vertical"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="product_type_id"
                                className="font-semibold text-gray-700"
                            >
                                Category
                            </label>
                            <select
                                name="product_type_id"
                                id="product_type_id"
                                value={formData.product_type_id}
                                onChange={handleInputChange}
                                className="border-2 border-gray-200 p-3 rounded-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 bg-white"
                                required
                                disabled={isLoading}
                            >
                                <option value="">
                                    {isLoading
                                        ? "Loading categories..."
                                        : "Select a category"}
                                </option>
                                {productTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.type_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={loading || isLoading}
                            className={`text-white p-3 rounded-md mt-4 w-full font-semibold transition-all duration-150 ${
                                loading || isLoading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-slate-900 hover:bg-slate-800 active:scale-95"
                            }`}
                        >
                            {loading ? "Creating Product..." : "Create Product"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddMenu;
