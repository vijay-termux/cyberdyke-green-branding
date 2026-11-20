import { submitPublicApplication } from '@/lib/public-submissions'

export async function POST(request) {
  return submitPublicApplication(request, 'contact')
}
