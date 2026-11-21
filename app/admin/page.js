import { redirect } from 'next/navigation'
import { getAdminUser } from '@/lib/admin-auth'
import AdminDashboard from './dashboard-client'

export const metadata = { title: 'Owner Dashboard | CyberdykeTech', robots: { index: false, follow: false } }

export default async function AdminPage() {
  const user = await getAdminUser()
  if (!user) redirect('/admin/login')
  return <AdminDashboard email={user.email} />
}
