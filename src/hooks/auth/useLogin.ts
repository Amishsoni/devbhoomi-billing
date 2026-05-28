'use client'

import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'

import { smartPostRequest } from '@/lib/axios'
import type { LoginFormValues } from '@/lib/validations/auth'
import { setUser, useAppDispatch } from '@/store'
import type { LoginSuccessResponse } from '@/types/auth'

export const useLogin = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: (payload: LoginFormValues) =>
      smartPostRequest<LoginSuccessResponse>('/api/auth/login', payload),
    onSuccess: data => {
      dispatch(
        setUser({
          id: data.user.id,
          email: data.user.email
        })
      )
      router.push('/home')
      router.refresh()
    }
  })
}
