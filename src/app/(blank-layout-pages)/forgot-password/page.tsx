// Next Imports
import type { Metadata } from 'next'

// Component Imports
import ForgotPasswordView from '@/views/auth/ForgotPasswordView'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy and policy'
}

const ForgotPasswordPage = () => {
  // Vars
  const mode = getServerMode()

  return <ForgotPasswordView mode={mode} />
}

export default ForgotPasswordPage
