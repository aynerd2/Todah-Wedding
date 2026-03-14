// app/admin/moderation/layout.tsx (or page.tsx)
import AdminGuard from '@/components/AdminGuard'

export default function ModerationLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-slate-50">
        {/* Your Sidebar or Navigation could go here */}
        {children}
      </div>
    </AdminGuard>
  )
}