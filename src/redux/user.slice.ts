import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { User } from '@/interfaces/backend/user'

interface UserState {
  token?: string
  loggedUser?: User
}

const initialState: UserState = {
  token: localStorage.getItem('token') || undefined,
  loggedUser: (() => {
    const user = localStorage.getItem('user')
    if (user === null) return undefined
    return JSON.parse(user)
  })(),
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setLoggedUser: (state, action: PayloadAction<User>) => {
      state.loggedUser = action.payload
    },
    removeToken: (state) => {
      state.token = undefined
    },
    removeLoggedUser: (state) => {
      state.loggedUser = undefined
    },
  },
})

export const selectToken = (state: RootState) => state.user.token
export const selectLoggedUser = (state: RootState) => state.user.loggedUser

export const { setLoggedUser, setToken, removeLoggedUser, removeToken } = userSlice.actions
export default userSlice.reducer
