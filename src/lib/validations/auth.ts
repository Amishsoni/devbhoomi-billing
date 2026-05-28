import * as yup from 'yup'

export const loginSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
})

export type LoginFormValues = yup.InferType<typeof loginSchema>

export const registerSchema = yup.object({
  full_name: yup.string().trim().required('Full name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  mobile: yup
    .string()
    .matches(/^[0-9+\-\s()]{10,15}$/, 'Enter a valid phone number')
    .required('Phone number is required'),
  branch_id: yup.string().uuid('Select a branch').required('Branch is required'),
  image: yup
    .mixed<File>()
    .nullable()
    .optional()
    .test('fileType', 'Only image files are allowed', value => {
      if (!value) return true

      return value.type.startsWith('image/')
    })
    .test('fileSize', 'Image must be less than 5MB', value => {
      if (!value) return true

      return value.size <= 5 * 1024 * 1024
    }),
  agreedToTerms: yup.boolean().oneOf([true], 'You must accept the privacy policy & terms').required()
})

export type RegisterFormValues = yup.InferType<typeof registerSchema>
