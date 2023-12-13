// import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.scss'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import './i18n'
import { App } from './App.tsx'
import { Provider } from 'react-redux'
import { CssBaseline } from '@mui/material'

import { store } from './redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>
  // </React.StrictMode>
)
