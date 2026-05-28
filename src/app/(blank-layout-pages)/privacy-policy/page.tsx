// Next Imports
import type { Metadata } from 'next'

// Component Imports
import PrivacyView from '@/views/auth/PrivacyView'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy and policy'
}

const PrivacyPage = () => {
  // Vars
  const mode = getServerMode()

  return <PrivacyView mode={mode} />
}

export default PrivacyPage
