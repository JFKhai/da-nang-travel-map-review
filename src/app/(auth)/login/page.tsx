'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LockKeyhole, Mail } from 'lucide-react'

const INIT_DATA = {
  email: '',
  password: '',
  rememberMe: false,
}

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState(INIT_DATA)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (formData.email === 'test@example.com' && formData.password === 'password') {
        console.log('Simulated login successful with data:', formData)
        router.push('/')
      } else {
        setError('Email hoặc mật khẩu không chính xác. Vui lòng thử lại.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {}, [])

  return (
    <div className="relative min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* LEFT: IMAGE */}
      <div
        className="hidden md:flex relative bg-cover bg-center"
        style={{
          backgroundImage: "url('https://i.pinimg.com/1200x/1c/a2/69/1ca2698b47bdd7df34a7cc642990e3e2.jpg')",
          backgroundSize: 'cover',
        }}
      >
        <div className="relative z-10 text-white p-12 mx-auto text-center">
          <h1 className="text-4xl font-emotional mb-4">Travelista Tours</h1>
          <p className="max-w-md text-lg leading-relaxed font-cabinet-grotesk">
            Travel is the only purchase that enriches you in ways beyond material wealth
          </p>
        </div>
      </div>

      {/* RIGHT: LOGIN FORM */}
      <div className="relative flex items-center justify-center px-6 font-cabinet-grotesk">
        <div className="w-full max-w-md ">
          <h2 className="text-[74px] font-extrabold text-brand-teal  text-center">Welcome</h2>
          <p className="text-gray-500 mb-8 text-center">Login with Email</p>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm mb-1 text-brand-teal font-semibold">Email</label>
            <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 ring-brand-teal">
              <Mail className="text-brand-teal mr-3" />
              <input type="email" placeholder="thisuix@mail.com" className="w-full outline-none" />
            </div>
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-sm mb-1 text-brand-teal font-semibold">Password</label>
            <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 ring-brand-teal">
              <LockKeyhole className="text-brand-teal mr-3" />
              <input type="password" placeholder="********" className="w-full outline-none" />
            </div>
          </div>

          <div className="text-right text-sm text-gray-500 mb-6">
            <a href="">Forgot your password?</a>
          </div>

          <button className="w-full bg-brand-teal text-white py-3 rounded-lg font-semibold hover:bg-brand-dark transition">
            LOGIN
          </button>

          {/* OR */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Social */}
          <div className="flex justify-center gap-4">
            <button className=" border-none py-3 px-6 bg-[#E7F2F5] rounded-xl">
              <img src="/images/google-logo.svg" className="mx-auto h-6" />
            </button>
            <button className="border-none py-3 px-6 bg-[#E7F2F5] rounded-xl">
              <img src="/images/facebook-logo.svg" className="mx-auto h-6" />
            </button>
            <button className=" border-none py-3 px-6 bg-[#E7F2F5] rounded-xl">
              <img src="/images/apple-logo.svg" className="mx-auto h-6" />
            </button>
          </div>

          <p className="text-center text-sm mt-8">
            Don’t have account? <span className="text-brand-teal font-semibold cursor-pointer">Register Now</span>
          </p>
        </div>
        <img src="/images/login-icon-left-bottom.png" alt="" className="absolute bottom-0 left-0" />
      </div>

      <img src="/images/login-icon-right-top.png" alt="" className="absolute top-10 right-0" />
      <img src="/images/login-icon-right-bottom.png" alt="" className="absolute bottom-0 right-0" />
    </div>
  )
}
