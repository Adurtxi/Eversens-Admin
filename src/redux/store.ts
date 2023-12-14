import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './user.slice'
import SidebarReducer from './sidebar.slice'
import ConfigurationReducer from './configuration.slice'

export const store = configureStore({
    reducer: {
        user: UserReducer,
        sidebar: SidebarReducer,
        configuration: ConfigurationReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppDispatch = typeof store.dispatch