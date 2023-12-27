import { useMemo, ReactNode } from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles'

import { customShadows } from './custom-shadows'
import { overrides } from './overrides'
import { palette, palette_dark } from './palette'
import { shadows } from './shadows'
import { typography } from './typography'
import { useSelector } from 'react-redux'
import { selectTheme } from '@/redux/configuration.slice'
import { useMediaQuery } from '@mui/material'
import { grey } from './colors'

interface ThemeProviderProps {
  children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useSelector(selectTheme);
  const isLightMode = theme ? theme === 'light' : !prefersDarkMode;
  
  const memoizedValue: any = useMemo(
    () => ({
      palette: isLightMode ? palette() : palette_dark(),
      typography,
      shadows: shadows(isLightMode ? grey[500] : grey[900]),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    [isLightMode]
  )

  const currentTheme = createTheme(memoizedValue)
  currentTheme.components = overrides(currentTheme)

  return (
    <MUIThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}