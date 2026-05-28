'use client'

import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'

import { smartPostRequest } from '@/lib/axios'
import type { RegisterFormValues } from '@/lib/validations/auth'
import type { RegisterSuccessResponse } from '@/types/auth'

const buildRegisterFormData = (values: RegisterFormValues) => {
  const formData = new FormData()

  formData.append('email', values.email)
  formData.append('password', values.password)
  formData.append('full_name', values.full_name)
  formData.append('mobile', values.mobile)
  formData.append('branch_id', values.branch_id)

  if (values.image) {
    formData.append('image', values.image)
  }

  return formData
}

export const useRegister = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: (payload: RegisterFormValues) =>
      smartPostRequest<RegisterSuccessResponse>('/api/auth/register', buildRegisterFormData(payload)),
    onSuccess: data => {
      if (data.needsEmailConfirmation) {
        router.push('/login?verify=1')

        return
      }

      router.push('/home')
      router.refresh()
    }
  })
}
