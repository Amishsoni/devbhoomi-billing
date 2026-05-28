export type QueryParams = Record<string, string | number | boolean | null | undefined>

export type ApiSuccess<T = unknown> = {
  success: true
} & T

export type ApiError = {
  success: false
  message: string
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError
