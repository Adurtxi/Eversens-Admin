import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

interface SidebarState {
  isOpen: boolean
  openSubmenus: string[]
}

const initialState: SidebarState = {
  isOpen: true,
  openSubmenus: [],
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen
    },
    toggleSubmenu: (state, action: PayloadAction<string>) => {
      const index = state.openSubmenus.indexOf(action.payload)
      if (index >= 0) {
        state.openSubmenus.splice(index, 1)
      } else {
        state.openSubmenus.push(action.payload)
      }
    },
  },
})

export const { toggleSidebar, toggleSubmenu } = sidebarSlice.actions

export const selectIsOpen = (state: RootState) => state.sidebar.isOpen

export default sidebarSlice.reducer