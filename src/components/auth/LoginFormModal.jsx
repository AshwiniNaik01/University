import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Modal } from "../utility/Modal"
import { codedriftLogoImage } from "../../access-assets/images"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "../utility/Button"
import Image from "../utility/Image";
import { useLocation } from "react-router"


const LoginFormModal = ({ open, setOpen }) => {

    // const location = useLocation()

    // // ✅ Close modal on route change
    // useEffect(() => {
    //     if (open) {
    //         setOpen(false)
    //     }
    // }, [location.pathname])

    // < 'default' | 'otp' >
    const [mode, setMode] = useState('default')
    const [showPassword, setShowPassword] = useState(false)

    const handleLoginWithPassword = (e) => {
        e.preventDefault()
        alert('Logged in with Password!')
        setOpen(false)
    }

    const handleSendOTP = (e) => {
        e.preventDefault()
        // Simulate sending OTP
        setTimeout(() => {
            setMode('otp')
        }, 300)
    }

    const handleLoginWithOTP = (e) => {
        e.preventDefault()
        alert('Logged in with OTP!')
        setOpen(false)
    }

    return (
        <Modal isOpen={open} onClose={() => setOpen(false)} variant="sm" scrollableBody={false}>
            <Modal.Body>
                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <Image src={codedriftLogoImage} alt="CodeDrift Logo" className="w-16 h-16 rounded-full shadow-md" />
                </div>

                {/* Heading */}
                <div className="text-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Login to CodeDrift</h2>
                    <p className="text-sm text-gray-500">
                        {mode === 'default' ? 'Use your email or mobile with password' : 'Enter the OTP sent to your number'}
                    </p>
                </div>

                {/* FORM START */}
                {mode === 'default' && (
                    <form onSubmit={handleLoginWithPassword} className="space-y-4">
                        {/* Email/Mobile */}
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">
                                Mobile or Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter mobile or email"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                                maxLength={40}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label className="block text-gray-700 text-sm mb-1">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter password"
                                className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                                maxLength={20}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute top-9 right-3 text-gray-500 hover:text-gray-700"
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2 pt-2">
                            <Button type="submit" variant="pink" size="md" className="w-full">
                                Login
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="md"
                                className="w-full text-codedrift-indigo border-codedrift-indigo"
                                onClick={handleSendOTP}
                            >
                                Login with OTP
                            </Button>
                        </div>

                        {/* Links */}
                        <div className="flex justify-between text-sm pt-2">
                            <Link to="/auth/forgot-password" className="text-codedrift-indigo hover:underline">
                                Forgot Password?
                            </Link>
                            <Link to="/auth/register" className="text-codedrift-pink hover:underline">
                                Sign Up
                            </Link>
                        </div>
                    </form>
                )}

                {/* OTP FLOW */}
                {mode === 'otp' && (
                    <form onSubmit={handleLoginWithOTP} className="space-y-4">
                        {/* Email/Mobile - preserved for context (disabled) */}
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">
                                Mobile or Email
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-500 border border-gray-200"
                            />
                        </div>

                        {/* OTP Input */}
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">
                                OTP <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                                maxLength={6}
                                required
                            />
                        </div>

                        {/* OTP Actions */}
                        <div className="space-y-2 pt-2">
                            <Button type="submit" variant="pink" size="md" className="w-full">
                                Login with OTP
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="md"
                                className="w-full text-codedrift-indigo border-codedrift-indigo"
                                onClick={() => setMode('default')}
                            >
                                Use Password Instead
                            </Button>
                        </div>

                        {/* Links */}
                        <div className="flex justify-between text-sm pt-2">
                            <Link to="/forgot-password" className="text-codedrift-indigo hover:underline">
                                Trouble Logging In?
                            </Link>
                            <Link to="/auth/register" className="text-codedrift-pink hover:underline">
                                Sign Up
                            </Link>
                        </div>
                    </form>
                )}
            </Modal.Body>
        </Modal>
    )
}


export default LoginFormModal