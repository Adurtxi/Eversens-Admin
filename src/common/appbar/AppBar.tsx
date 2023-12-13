import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { ListItemIcon, Menu, Toolbar, Box, IconButton, Typography, MenuItem, useTheme, Avatar, Select, FormControl, Divider, SelectChangeEvent } from '@mui/material'
import { IconMenu, IconSettings, IconLogout, IconMoonFilled, IconSunFilled, IconLanguage } from '@tabler/icons-react'

import { useOpenCloseAppBar } from '@/hooks/use-open-close-app-bar'
import { selectIsOpen, toggleSidebar } from '@/redux/sidebar.slice'
import { useLogout } from '@/hooks/use-logout'
import { drawerWidth } from '../constants/sizes'
import { toggleTheme } from '@/redux/configuration.slice'

import logoImage from '@/assets/img/logo.png'

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const CustomAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

interface Menu {
  name: string
  icon: any
  link: string
  submenus?: Menu[]
}

export default function MyAppBar() {
  const { i18n, t } = useTranslation()

  const isOpen = useSelector(selectIsOpen)
  const dispatch = useDispatch()

  const { onLogout } = useLogout()

  const onChangeLanguage = (event: SelectChangeEvent) => i18n.changeLanguage(event.target.value)
  
  const { settings, languages } = useMemo(() => {
    const settings = [
      {
        name: t('appbar.settings'),
        icon: <IconSettings />,
        action: () => { },
      },
      {
        name: t('appbar.logout'),
        icon: <IconLogout />,
        action: () => onLogout(),
      },
    ]

    const languages = [
      { label: t('languages.es'), code: "es" },
      { label: t('languages.en'), code: "en" },
    ]

    return { settings, languages }
  }, [t, onLogout])

  const {
    handleOpenUserMenu,
    handleCloseUserMenu,
    anchorElUser,
  } = useOpenCloseAppBar()

  const theme = useTheme()

  return (
    <CustomAppBar position="absolute" open={isOpen}>
      <Toolbar sx={{ pr: '22px' }}>
        <IconButton
          edge="start"
          onClick={() => dispatch(toggleSidebar())}
          sx={{
            color: '#fff',
            marginRight: '36px',
            ...(isOpen && { display: 'none' }),
          }}
        >
          <IconMenu />
        </IconButton>

        <img
          src={logoImage}
          alt="Logo"
          style={{
            width: '40px',
            height: '40px',
            marginRight: '10px',
            borderRadius: '50%',
          }}
        />
        <Typography
          component="h1"
          variant="h6"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          everSens
        </Typography>

        <Box sx={{ flexGrow: 0 }}>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" />
          </IconButton>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem>
              <ListItemIcon>
                <IconLanguage />
              </ListItemIcon>
              <FormControl size="small" fullWidth>
                <Select value={i18n.language} onChange={onChangeLanguage}>
                  { languages.map((language) => 
                    <MenuItem key={`${i18n.language}-${language.code}`} value={language.code}>
                      {language.label}
                    </MenuItem>) 
                  }
                </Select>
              </FormControl>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => dispatch(toggleTheme())}>
              <ListItemIcon>
                {theme.palette.mode === 'dark' ? (
                  <IconSunFilled />
                ) : (
                  <IconMoonFilled />
                )}
              </ListItemIcon>
              Modo {theme.palette.mode == 'dark' ? 'claro' : 'oscuro'}
            </MenuItem>
            {settings.map((setting) => (
              <MenuItem key={setting.name} onClick={() => {
                handleCloseUserMenu()
                setting.action()
              }}>
                <ListItemIcon>{setting.icon}</ListItemIcon>
                {setting.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </CustomAppBar>
  )
}