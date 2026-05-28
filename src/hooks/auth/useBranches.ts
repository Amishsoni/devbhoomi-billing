'use client'

import { useQuery } from '@tanstack/react-query'

import { smartGetRequest } from '@/lib/axios'
import type { BranchesResponse } from '@/types/auth'

export const useBranches = () =>
  useQuery({
    queryKey: ['branches'],
    queryFn: () => smartGetRequest<BranchesResponse>('/api/branches'),
    select: response => response.data
  })
