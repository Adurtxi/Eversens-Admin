import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MyThemeProvider from './theme/index.tsx'
import { AppRouter } from './Router.tsx'
import i18n from './i18n.ts'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const queryClient = new QueryClient()

export const App = () => {
  const language = localStorage.getItem('language')
  if (language) i18n.changeLanguage(language)

  return <LocalizationProvider dateAdapter={AdapterDayjs}>
    <MyThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </QueryClientProvider>
    </MyThemeProvider>
  </LocalizationProvider>
}