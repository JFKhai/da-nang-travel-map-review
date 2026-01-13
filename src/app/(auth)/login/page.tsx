import LoginForm from '@/components/login-form'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <h2 className="text-[74px] font-extrabold text-brand-teal text-center">Welcome</h2>
      <p className="text-gray-500 mb-8 text-center">Login with Email</p>
      <LoginForm />
      {/* OR */}
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="px-3 text-gray-400 text-sm">OR</span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      {/* Social */}
      <div className="flex justify-center gap-4">
        <button className="border-none py-3 px-6 bg-[#E7F2F5] rounded-xl hover:bg-[#d0e5ea] transition">
          <img src="/images/google-logo.svg" className="mx-auto h-6" alt="Google" />
        </button>
        <button className="border-none py-3 px-6 bg-[#E7F2F5] rounded-xl hover:bg-[#d0e5ea] transition">
          <img src="/images/facebook-logo.svg" className="mx-auto h-6" alt="Facebook" />
        </button>
        <button className="border-none py-3 px-6 bg-[#E7F2F5] rounded-xl hover:bg-[#d0e5ea] transition">
          <img src="/images/apple-logo.svg" className="mx-auto h-6" alt="Apple" />
        </button>
      </div>

      <p className="text-center text-sm mt-8">
        <Link href="/register" className="text-brand-teal font-semibold cursor-pointer hover:underline">
          Register Now
        </Link>
      </p>
    </div>
  )
}
