'use client'

import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'

import { Controller, type Control, type FieldErrors, type FieldValues, type Path } from 'react-hook-form'

const getErrorMessage = (errors: FieldErrors<FieldValues>, name: string) => {
  const keys = name.split('.')
  let current: unknown = errors

  for (const key of keys) {
    if (current == null || typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[key]
  }

  if (current && typeof current === 'object' && 'message' in current) {
    const message = (current as { message?: unknown }).message

    return typeof message === 'string' ? message : undefined
  }

  return undefined
}

export type CustomFileInputProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  errors: FieldErrors<TFieldValues>
  name: Path<TFieldValues>
  label?: string
  accept?: string
}

const CustomFileInput = <TFieldValues extends FieldValues>({
  control,
  errors,
  name,
  label = 'Profile photo',
  accept = 'image/*'
}: CustomFileInputProps<TFieldValues>) => {
  const errorMessage = getErrorMessage(errors, name as string)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => (
        <FormControl fullWidth error={Boolean(errorMessage)}>
          <input
            {...field}
            id={`${String(name)}-file`}
            type='file'
            accept={accept}
            hidden
            onChange={event => {
              const file = event.target.files?.[0] ?? null
              onChange(file)
            }}
          />
          <div className='flex flex-col gap-2'>
            <Typography variant='body2'>{label}</Typography>
            <div className='flex items-center gap-3 flex-wrap'>
              <Button variant='outlined' component='label' htmlFor={`${String(name)}-file`}>
                Choose image
              </Button>
              <Typography variant='body2' color='text.secondary'>
                {(value as File | null)?.name ?? 'No file selected (optional)'}
              </Typography>
            </div>
          </div>
          {errorMessage ? <FormHelperText>{errorMessage}</FormHelperText> : null}
        </FormControl>
      )}
    />
  )
}

export default CustomFileInput
