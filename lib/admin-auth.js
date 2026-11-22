import { createClient } from '@/lib/supabase/server'

export async function getAdminUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (
    error ||
    !user ||
    !process.env.ADMIN_EMAIL ||
    user.email?.toLowerCase() !== process.env.ADMIN_EMAIL.toLowerCase() ||
    user.app_metadata?.role !== 'owner'
  ) return null
  return user
}

export async function requireAdmin() {
  const user = await getAdminUser()
  if (!user) {
    const error = new Error('Unauthorized')
    error.status = 401
    throw error
  }
  return user
}
