import { configureStore } from '@reduxjs/toolkit'
import dashboardSlice from '../redux/dashboardSlice'

export const store = configureStore({
  reducer: {
    dashboardSlice: dashboardSlice,
  },
})