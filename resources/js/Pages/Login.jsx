import axios from 'axios'
import React, { useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleback = () => {
        navigate(-1)
    }


    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const response = await axios.post('/api/auth', {email, password})
            console.log("Login berhasil:", response.data)
            const {accesstoken, user} = response.data

            localStorage.setItem('token', accesstoken)
            localStorage.setItem('user', JSON.stringify(user))
            navigate('/')
            
        } catch (error) {
            console.error("Login error:", error) 
            console.log("Response error message:", error.response?.data?.message) 
            setError(
                error.response?.data?.message || "Something went wrong, please try again." 
            )
            setLoading(false)
        }
    }
    
   

  return (
    <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center border-2 w-96 rounded-2xl gap-5 p-5">
                <div className="flex flex-col p-5 w-full">
                    <div className="flex justify-between w-full">
                        <h1 className="text-4xl font-bold mb-3">Welcome </h1>
                        <div
                            onClick={handleback}
                            className="text-slate-900 text-xl "
                        >
                            <IoIosClose />
                        </div>
                    </div>
                    <p className="text-gray-500">Login to your account</p>

                    {error && (
                        <div className="bg-red-100 text-red-700 p-2 rounded-md my-2">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} >
                        <div className="flex flex-col gap-2 my-5 ">
                            <label htmlFor="email" className="font-semibold">
                                Email
                            </label>
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border-2 border-gray-200 p-2 rounded-md focus:outline-none focus:border-gray-400"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-slate-900 text-white p-2 rounded-md mt-6 w-full active:scale-95 duration-150"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Login"} 
                        </button>
                    </form>

                    <p className="text-gray-500 mt-5">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-slate-900">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
  )
}

export default Login