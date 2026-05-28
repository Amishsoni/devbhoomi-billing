'use client'

import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import type  SelectProps from '@mui/material/Select'
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

export type SelectOption = {
  label: string
  value: string
}

export type CustomSelectInputProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  errors: FieldErrors<TFieldValues>
  name: Path<TFieldValues>
  label: string
  options: SelectOption[]
  loading?: boolean
  placeholder?: string
} & Omit<SelectProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'ref' | 'error'>

const CustomSelectInput = <TFieldValues extends FieldValues>({
  control,
  errors,
  name,
  label,
  options,
  loading = false,
  placeholder = 'Select',
  fullWidth = true,
  ...rest
}: CustomSelectInputProps<TFieldValues>) => {
  const errorMessage = getErrorMessage(errors, name as string)
  const hasError = Boolean(errorMessage)

  return (
    <FormControl fullWidth={fullWidth} error={hasError}>
      <InputLabel id={`${String(name)}-label`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            {...rest}
            labelId={`${String(name)}-label`}
            label={label}
            value={field.value ?? ''}
            disabled={loading || rest.disabled}
          >
            <MenuItem value='' disabled>
              {placeholder}
            </MenuItem>
            {options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errorMessage ? <FormHelperText>{errorMessage}</FormHelperText> : null}
    </FormControl>
  )
}

export default CustomSelectInput
