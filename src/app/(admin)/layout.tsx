import AdminSidebar from '@/components/admin-sidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 h-screen "> {children}</div>
    </div>
  )
}
