export default function AuthLayout({ children }: { children: React.ReactNode }) {
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
        {children}
        <img src="/images/login-icon-left-bottom.png" alt="" className="absolute bottom-0 left-0" />
      </div>

      <img src="/images/login-icon-right-top.png" alt="" className="absolute top-10 right-0" />
      <img src="/images/login-icon-right-bottom.png" alt="" className="absolute bottom-0 right-0" />
    </div>
  )
}
