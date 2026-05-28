import { combineReducers } from '@reduxjs/toolkit'

import { appReducer } from './slices/appSlice'
import { authReducer } from './slices/authSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer
})

export type RootState = ReturnType<typeof rootReducer>
