import React from 'react'
import { Link } from 'react-router-dom'

import Image from '../../components/utility/Image'
import { codedriftLogoImage } from '../../access-assets/images'
import { Button } from '../../components/utility/Button'

const ForgotPasswordPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Password reset link / OTP sent!")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200">
        
        {/* 🔰 Logo */}
        <div className="flex justify-center mb-4">
          <Image src={codedriftLogoImage} alt="CodeDrift Logo" className="w-16 h-16 rounded-full shadow" />
        </div>

        {/* 🔤 Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Forgot your password?</h1>
          <p className="text-sm text-gray-500 mt-1">
            Don’t worry, we’ll help you reset it.
          </p>
        </div>

        {/* 📝 Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Mobile or Email <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your registered mobile or email"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink focus:border-codedrift-pink outline-none"
              required
            />
          </div>

          <Button type="submit" variant="pink" size="md" className="w-full">
            Send Reset Link / OTP
          </Button>
        </form>

        {/* 🔁 Links */}
        <div className="text-center text-sm mt-6 text-gray-600">
          Remembered your password?{" "}
          <Link to="/login" className="text-codedrift-indigo font-medium hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
