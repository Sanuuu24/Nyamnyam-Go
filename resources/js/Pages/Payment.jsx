// resources/js/Pages/Payment.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    selectCartItems,
    selectCartTotal,
    selectCartItemsCount,
    clearCart,
} from "../redux/slices/cartSlice";
import { IoIosClose } from "react-icons/io";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
    const dispatch = useDispatch();
    const handleback = () => {
        Navigate(-1);
    };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    const cartItems = useSelector(selectCartItems);
    const { subtotal, ppn, total } = useSelector(selectCartTotal);
    const totalItems = useSelector(selectCartItemsCount);

    // menggunakan email

    // const handleProcessPayment = async () => {
    //     const orderData = {
    //         name,
    //         email,
    //         phone,
    //         address,
    //         paymentMethod,
    //         items: cartItems,
    //         subtotal,
    //         ppn,
    //         total: total + ppn,
    //     };

    //     try {
    //         await axios.post(
    //             "http://127.0.0.1:8000/api/send-order-email",
    //             orderData
    //         );
    //         alert("Pesanan berhasil dikirim ke email admin.");
    //         // dispatch(clearCart()); // Aktifkan jika mau kosongkan keranjang
    //     } catch (error) {
    //         console.error("Gagal kirim email:", error);
    //         alert("Terjadi kesalahan saat mengirim email.");
    //     }
    // };

    const handleProcessPayment = async () => {
        const orderData = {
            name,
            email,
            phone,
            address,
            paymentMethod,
            items: cartItems,
            subtotal,
            ppn,
            total: total + ppn,
        };

        // ✅ Kirim ke email (via backend Laravel)
        try {
            await axios.post("/send-order-email", orderData);
            console.log("Email berhasil dikirim");
        } catch (error) {
            console.error("Gagal kirim email:", error);
        }

        // ✅ Format pesan untuk WhatsApp
        const itemList = cartItems
            .map(
                (item) =>
                    `- ${item.products_name} x${item.quantity} = Rp ${(
                        item.price * item.quantity
                    ).toLocaleString()}`
            )
            .join("%0A");

        const message = `*Pesanan Baru*%0A
Nama: ${name}%0A
Email: ${email}%0A
Telepon: ${phone}%0A
Alamat: ${address}%0A
Metode Pembayaran: ${paymentMethod}%0A
%0A*Detail Pesanan:*%0A${itemList}%0A
%0ASubtotal: Rp ${subtotal.toLocaleString()}%0A
PPN: Rp ${ppn.toLocaleString()}%0A
Total: Rp ${(total + ppn).toLocaleString()}`;

        const adminPhone = "6285215379761"; // ganti nomor admin
        const waLink = `https://wa.me/${adminPhone}?text=${message}`;

        window.open(waLink, "_blank");

        // Opsional: kosongkan keranjang
        dispatch(clearCart());
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">
                        Keranjang Kosong
                    </h2>
                    <p className="text-gray-600">
                        Silakan tambahkan produk ke keranjang terlebih dahulu
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold mb-8">Pembayaran</h1>
                    <div
                        onClick={handleback}
                        className="text-slate-900 text-2xl "
                    >
                        <IoIosClose />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Ringkasan Pesanan
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Total: {totalItems} item(s)
                        </p>

                        <div className="space-y-4 mb-4">
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
                                    <span className=" text-gray-800 text-sm">
                                        Rp {}
                                        {(
                                            item.price * item.quantity
                                        ).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Subtotal:</span>
                                <span>Rp {subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>PPN (11%):</span>
                                <span>Rp {ppn.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2">
                                <span>Total:</span>
                                <span>Rp {(total + ppn).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Detail Pembayaran
                        </h2>

                        <form className="space-y-4">
                            <div>
                                Nama Lengkap
                                <label className="block text-sm font-medium mb-2"></label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Masukkan nama lengkap"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Masukkan email"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Nomor Telepon
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Masukkan nomor telepon"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Alamat
                                </label>
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                    placeholder="Masukkan alamat lengkap"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Metode Pembayaran
                                </label>
                                <select
                                    value={paymentMethod}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">
                                        Pilih metode pembayaran
                                    </option>
                                    <option value="cod">
                                        Cash on Delivery
                                    </option>
                                </select>
                            </div>

                            <button
                                type="button"
                                onClick={handleProcessPayment}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                            >
                                Proses Pembayaran - Rp{" "}
                                {(total + ppn).toLocaleString()}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
