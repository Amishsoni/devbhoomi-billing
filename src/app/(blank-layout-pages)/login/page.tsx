// Next Imports
import { Suspense } from 'react'
import type { Metadata } from 'next'

// Component Imports
import Login from '@/views/auth/Login'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account'
}

const LoginPage = () => {
  // Vars
  const mode = getServerMode()

  return (
    <Suspense fallback={null}>
      <Login mode={mode} />
    </Suspense>
  )
}

export default LoginPage
