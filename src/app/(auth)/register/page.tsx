'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LockKeyhole, Mail, Phone, User } from 'lucide-react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!')
      return
    }

    console.log('Register data:', formData)
  }

  return (
    <div className="w-full max-w-md ">
      <h2 className="text-[74px] font-extrabold text-brand-teal  text-center -mt-14">Register</h2>
      <p className="text-gray-500 mb-4 -mt-2 text-center">Register a new account</p>

      <div className="mb-6 grid md:grid-cols-2 gap-2">
        {/* Name */}
        <div className="mb-1 col-span-2">
          <label className="block text-sm mb-1 text-brand-teal font-semibold">Full Name</label>
          <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 ring-brand-teal">
            <User className="text-brand-teal mr-3" />
            <input type="text" placeholder="" className="w-full outline-none" />
          </div>
        </div>
        {/* Email */}
        <div className="mb-1 col-span-2">
          <label className="block text-sm mb-1 text-brand-teal font-semibold">Email</label>
          <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 ring-brand-teal">
            <Mail className="text-brand-teal mr-3" />
            <input type="email" placeholder="thisuix@mail.com" className="w-full outline-none" />
          </div>
        </div>
        {/* Phone */}
        <div className="mb-1 col-span-2">
          <label className="block text-sm mb-1 text-brand-teal font-semibold">Phone</label>
          <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 ring-brand-teal">
            <Phone className="text-brand-teal mr-3" />
            <input type="tel" placeholder="" className="w-full outline-none" />
          </div>
        </div>
        {/* Password */}
        <div className="mb-1">
          <label className="block text-sm mb-1 text-brand-teal font-semibold">Password</label>
          <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 ring-brand-teal">
            <LockKeyhole className="text-brand-teal mr-3" />
            <input type="password" placeholder="********" className="w-full outline-none" />
          </div>
        </div>
        {/* Password */}
        <div className="mb-1">
          <label className="block text-sm mb-1 text-brand-teal font-semibold">Confirm password</label>
          <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 ring-brand-teal">
            <LockKeyhole className="text-brand-teal mr-3" />
            <input type="password" placeholder="********" className="w-full outline-none" />
          </div>
        </div>
      </div>

      <button className="w-full bg-brand-teal text-white py-3 rounded-lg font-semibold hover:bg-brand-dark transition">
        REGISTER
      </button>

      <p className="text-center text-sm mt-8">
        Do you have account? <span className="text-brand-teal font-semibold cursor-pointer">Login Now</span>
      </p>
    </div>
  )
}
