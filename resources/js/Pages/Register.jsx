import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (

    <div className="flex justify-center items-center h-screen">
    <div className="flex flex-col justify-center items-center border-2 w-96 rounded-2xl gap-5 p-5">
        <div className="flex flex-col p-5 w-full">
            <div className="flex justify-between">
                <h1 className="text-4xl font-bold mb-3">
                    Registration
                </h1>
                <div
                    // onClick={handleback}
                    className="text-slate-900 text-xl"
                >
                    {/* <IoIosClose /> */}
                </div>
            </div>
            <p className="text-gray-500">Please enter your details</p>
{/* 
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
                    {error}
                </div>
            )} */}

            <form
                // onSubmit={handleSubmit}
                className="flex flex-col gap-2 my-5"
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-semibold">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        // value={formData.name}
                        // onChange={handleChange}
                        placeholder="Name"
                        className="border-2 border-gray-200 p-2 rounded-md focus:outline-none focus:border-gray-400"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-semibold">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        // value={formData.email}
                        // onChange={handleChange}
                        placeholder="Email"
                        className="border-2 border-gray-200 p-2 rounded-md focus:outline-none focus:border-gray-400"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="font-semibold">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        // value={formData.password}
                        // onChange={handleChange}
                        placeholder="Password"
                        className="border-2 border-gray-200 p-2 rounded-md focus:outline-none focus:border-gray-400"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="password_confirmation"
                        className="font-semibold"
                    >
                        Password Confirmation
                    </label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        // value={formData.password_confirmation}
                        // onChange={handleChange}
                        placeholder="Confirm Password"
                        className="border-2 border-gray-200 p-2 rounded-md focus:outline-none focus:border-gray-400"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-slate-900 text-white p-2 rounded-md focus:outline-none focus:border-gray-400 mt-4 active:scale-95 duration-150"
                    // disabled={loading}
                >
                    {/* {loading ? "Registering..." : "Register"} */} register
                </button>
            </form>

            <p className="text-gray-500 mt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-slate-900">
                    Login
                </Link>
            </p>
        </div>
    </div>
</div>
)
}

export default Register