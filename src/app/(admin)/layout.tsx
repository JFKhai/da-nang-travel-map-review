import AdminSidebar from '@/components/admin-sidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="overflow-x-scroll h-screen px-4 py-4"> {children}</div>
    </div>
  )
}
