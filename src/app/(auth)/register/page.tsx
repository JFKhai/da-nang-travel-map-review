import Link from 'next/link'
import RegisterForm from '@/components/register-form'

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md ">
      <h2 className="text-[74px] font-extrabold text-brand-teal  text-center -mt-14">Register</h2>
      <p className="text-gray-500 mb-4 -mt-2 text-center">Register a new account</p>
      <RegisterForm />
      <p className="text-center text-sm mt-8">
        Do you have account?{' '}
        <Link href={'/login'} className="text-brand-teal font-semibold cursor-pointer">
          Login Now
        </Link>
      </p>
    </div>
  )
}
