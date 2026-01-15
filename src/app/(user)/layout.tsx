import Footer from '@/components/footer'
import { Header } from '@/components/header'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="bg-brand-teal/40">{children}</div>
      <Footer />
    </>
  )
}
