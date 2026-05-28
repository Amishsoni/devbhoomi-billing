export type LoginSuccessResponse = {
  success: true
  user: {
    id: string
    email?: string
  }
}

export type LoginErrorResponse = {
  success: false
  message: string
}

export type BranchOption = {
  value: string
  label: string
}

export type BranchesResponse = {
  success: true
  data: BranchOption[]
}

export type RegisterSuccessResponse = {
  success: true
  userId: string
  needsEmailConfirmation: boolean
}
