import type { AxiosRequestConfig } from 'axios'

import { axiosInstance } from './instance'
import type { QueryParams } from './types'

const unwrap = <T>(promise: Promise<{ data: T }>) => promise.then(res => res.data)

export const smartGetRequest = <T = unknown>(
  url: string,
  params?: QueryParams,
  config?: AxiosRequestConfig
) => unwrap<T>(axiosInstance.get<T>(url, { ...config, params }))

export const smartPostRequest = <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
) => unwrap<T>(axiosInstance.post<T>(url, data, config))

export const smartPutRequest = <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
) => unwrap<T>(axiosInstance.put<T>(url, data, config))

export const smartDeleteRequest = <T = unknown>(
  url: string,
  params?: QueryParams,
  config?: AxiosRequestConfig
) => unwrap<T>(axiosInstance.delete<T>(url, { ...config, params }))
