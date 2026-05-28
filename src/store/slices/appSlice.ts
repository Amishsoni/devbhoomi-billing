import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type AppState = {
  globalLoading: boolean
}

const initialState: AppState = {
  globalLoading: false
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload
    }
  }
})

export const { setGlobalLoading } = appSlice.actions
export const appReducer = appSlice.reducer
