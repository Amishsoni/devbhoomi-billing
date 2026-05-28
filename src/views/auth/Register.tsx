'use client'

import { useState } from 'react'

import Link from 'next/link'

import { yupResolver } from '@hookform/resolvers/yup'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'
import classnames from 'classnames'
import { Controller, useForm } from 'react-hook-form'

import type { Mode } from '@core/types'

import { CustomFileInput, CustomSelectInput, CustomTextInput } from '@/components/form'
import Illustrations from '@components/Illustrations'
import Logo from '@components/layout/shared/Logo'
import themeConfig from '@configs/themeConfig'
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import { useBranches } from '@/hooks/auth/useBranches'
import { useRegister } from '@/hooks/auth/useRegister'
import { registerSchema, type RegisterFormValues } from '@/lib/validations/auth'

const RegisterV2 = ({ mode }: { mode: Mode }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const darkImg = '/images/pages/auth-v2-mask-dark.png'
  const lightImg = '/images/pages/auth-v2-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-register-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-register-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-register-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-register-light-border.png'

  const authBackground = useImageVariant(mode, lightImg, darkImg)
  const { settings } = useSettings()

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      full_name: '',
      email: '',
      password: '',
      mobile: '',
      branch_id: '',
      image: null,
      agreedToTerms: false
    }
  })

  const { data: branches = [], isLoading: branchesLoading, isError: branchesError } = useBranches()
  const { mutate: register, isPending, error: registerError, reset: resetRegisterError } = useRegister()

  const onSubmit = (values: RegisterFormValues) => {
    resetRegisterError()
    register(values)
  }

  const apiErrorMessage = registerError?.message

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <div className='plb-12 pis-12'>
          <img
            src={characterIllustration}
            alt='character-illustration'
            className='max-bs-[500px] max-is-full bs-auto'
          />
        </div>
        <Illustrations
          image1={{ src: '/images/illustrations/objects/tree-3.png' }}
          image2={null}
          maskImg={{ src: authBackground }}
        />
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <div className='absolute block-start-5 sm:block-start-[38px] inline-start-6 sm:inline-start-[38px]'>
          <Logo />
        </div>

        <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset]'>
          <div>
            <Typography variant='h4'>Adventure starts here 🚀</Typography>
            <Typography className='mbe-1'>
              Make your {themeConfig.templateName} billing management easy and fun!
            </Typography>
          </div>

          {apiErrorMessage ? (
            <Alert severity='error' onClose={() => resetRegisterError()}>
              {apiErrorMessage}
            </Alert>
          ) : null}

          {branchesError ? (
            <Alert severity='warning'>Could not load branches. Add branches in Supabase or try again later.</Alert>
          ) : null}

          {!branchesLoading && branches.length === 0 ? (
            <Alert severity='info'>No branches found. Add at least one row in the `branches` table.</Alert>
          ) : null}

          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
            <CustomTextInput
              control={control}
              errors={errors}
              name='full_name'
              label='Full name'
              fullWidth
              autoFocus
            />
            <CustomTextInput control={control} errors={errors} name='email' label='Email' type='email' fullWidth />
            <CustomTextInput
              control={control}
              errors={errors}
              name='mobile'
              label='Phone number'
              type='tel'
              fullWidth
            />
            <CustomSelectInput
              control={control}
              errors={errors}
              name='branch_id'
              label='Branch'
              options={branches}
              loading={branchesLoading}
              placeholder='Select branch'
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
            <CustomFileInput control={control} errors={errors} name='image' label='Profile photo (optional)' />

            <div className='flex flex-col gap-1'>
              <Controller
                name='agreedToTerms'
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Boolean(field.value)}
                        onChange={(_, checked) => field.onChange(checked)}
                        onBlur={field.onBlur}
                      />
                    }
                    label={
                      <>
                        <span>I agree to </span>
                        <Link className='text-primary' href='/privacy-policy'>
                          privacy policy & terms
                        </Link>
                      </>
                    }
                  />
                )}
              />
              {errors.agreedToTerms?.message ? (
                <FormHelperText error>{String(errors.agreedToTerms.message)}</FormHelperText>
              ) : null}
            </div>

            <Button
              fullWidth
              variant='contained'
              type='submit'
              disabled={isPending || branchesLoading || branches.length === 0}
            >
              {isPending ? <CircularProgress size={22} color='inherit' /> : 'Sign Up'}
            </Button>
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>Already have an account?</Typography>
              <Typography component={Link} href='/login' color='primary'>
                Sign in instead
              </Typography>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterV2
