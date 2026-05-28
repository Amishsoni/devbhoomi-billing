import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type AuthUser = {
  id: string
  email?: string
}

type AuthState = {
  user: AuthUser | null
}

const initialState: AuthState = {
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload
    },
    clearUser: state => {
      state.user = null
    }
  }
})

export const { setUser, clearUser } = authSlice.actions
export const authReducer = authSlice.reducer
