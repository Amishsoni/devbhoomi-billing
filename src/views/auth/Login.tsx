'use client'

import { useState } from 'react'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { yupResolver } from '@hookform/resolvers/yup'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'

import type { Mode } from '@core/types'

import { CustomTextInput } from '@/components/form'
import Illustrations from '@components/Illustrations'
import Logo from '@components/layout/shared/Logo'
import themeConfig from '@configs/themeConfig'
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useLogin } from '@/hooks/auth/useLogin'
import { loginSchema, type LoginFormValues } from '@/lib/validations/auth'

const LoginV1 = ({ mode }: { mode: Mode }) => {
  const searchParams = useSearchParams()
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const showVerifyMessage = searchParams.get('verify') === '1'

  const darkImg = '/images/pages/auth-v1-mask-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-light.png'
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { mutate: login, isPending, error: loginError, reset: resetLoginError } = useLogin()

  const onSubmit = (values: LoginFormValues) => {
    resetLoginError()
    login(values)
  }

  const apiErrorMessage = loginError?.message

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='p-6 sm:!p-12'>
          <div className='flex justify-center items-center mbe-6'>
            <Logo />
          </div>
          <div className='flex flex-col gap-5'>
            <div>
              <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}!👋🏻`}</Typography>
              <Typography className='mbs-1'>Please sign-in to your account and start the adventure</Typography>
            </div>

            {showVerifyMessage ? (
              <Alert severity='success'>Account created. Check your email to verify, then sign in.</Alert>
            ) : null}

            {apiErrorMessage ? (
              <Alert severity='error' onClose={() => resetLoginError()}>
                {apiErrorMessage}
              </Alert>
            ) : null}

            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
              <CustomTextInput
                control={control}
                errors={errors}
                name='email'
                label='Email'
                type='email'
                fullWidth
                autoFocus
              />
              <CustomTextInput
                control={control}
                errors={errors}
                name='password'
                label='Password'
                type={isPasswordShown ? 'text' : 'password'}
                icon={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'}
                onIconPress={() => setIsPasswordShown(show => !show)}
                fullWidth
              />
              <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                <Typography className='text-end' color='primary' component={Link} href='/forgot-password'>
                  Forgot password?
                </Typography>
              </div>
              <Button fullWidth variant='contained' type='submit' disabled={isPending}>
                {isPending ? <CircularProgress size={22} color='inherit' /> : 'Log In'}
              </Button>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>New on our platform?</Typography>
                <Typography component={Link} href='/register' color='primary'>
                  Create an account
                </Typography>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
      <Illustrations maskImg={{ src: authBackground }} />
    </div>
  )
}

export default LoginV1
