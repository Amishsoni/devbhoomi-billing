'use client'

import type { HTMLInputTypeAttribute } from 'react'

import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import type TextFieldProps from '@mui/material/TextField'

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

export type CustomTextInputProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  errors: FieldErrors<TFieldValues>
  name: Path<TFieldValues>
  type?: HTMLInputTypeAttribute
  /** Remix icon class, e.g. `ri-eye-line` */
  icon?: string
  onIconPress?: () => void
} & Omit<TextFieldProps, 'name' | 'type' | 'error' | 'helperText' | 'value' | 'onChange' | 'onBlur' | 'ref'>

const CustomTextInput = <TFieldValues extends FieldValues>({
  control,
  errors,
  name,
  type = 'text',
  icon,
  onIconPress,
  InputProps,
  helperText,
  ...rest
}: CustomTextInputProps<TFieldValues>) => {
  const errorMessage = getErrorMessage(errors, name as string)
  const hasError = Boolean(errorMessage)

  const endAdornment =
    icon && onIconPress ? (
      <InputAdornment position='end'>
        <IconButton
          size='small'
          edge='end'
          onClick={onIconPress}
          onMouseDown={(event: MouseEvent) => event.preventDefault()}
          aria-label='input action'
        >
          <i className={icon} />
        </IconButton>
      </InputAdornment>
    ) : icon ? (
      <InputAdornment position='end'>
        <i className={icon} />
      </InputAdornment>
    ) : (
      InputProps?.endAdornment
    )

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          {...rest}
          type={type}
          error={hasError}
          helperText={errorMessage ?? helperText}
          InputProps={{
            ...InputProps,
            endAdornment
          }}
        />
      )}
    />
  )
}

export default CustomTextInput
