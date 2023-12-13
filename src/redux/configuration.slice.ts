import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

interface ConfigurationState {
  theme?: string
}

const initialState: ConfigurationState = {
  theme: localStorage.getItem('theme') || undefined
}

export const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const theme = state.theme === 'light' ? 'dark' : 'light'

      state.theme = theme
      localStorage.setItem('theme', theme)
    },
  },
})

export const selectTheme = (state: RootState) => state.configuration.theme

export const { toggleTheme } = configurationSlice.actions
export default configurationSlice.reducer
