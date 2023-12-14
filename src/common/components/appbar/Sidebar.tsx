import { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { styled, useTheme } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { ListItem, ListItemIcon, ListItemText, Collapse, Menu, Toolbar, Divider, List, Box, IconButton } from '@mui/material'
import { IconHome, IconUsersGroup, IconMedicineSyrup, IconChevronLeft, IconMedicalCrossCircle, IconNurse, IconPills } from '@tabler/icons-react'

import { toggleSidebar, toggleSubmenu } from '@/redux/sidebar.slice'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { drawerWidth } from '../../constants/sizes'

const CustomDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiListItem-root': {
      cursor: 'pointer',
      ...( !open && { justifyContent: 'center' }),
    },
    '& .MuiListItemIcon-root': {
      ...( !open && { minWidth: 0 }),
    },
    '& .MuiDrawer-paper': {
      position: 'relative',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(8),
      }),
    },
  }),
)

interface Menu {
  name: string
  icon?: JSX.Element
  link?: string
  submenus?: SubMenu[]
}

interface SubMenu {
  name: string
  icon: any
  link: string
}

export default function MySidebar() {
  const dispatch = useDispatch()

  const isOpen = useSelector((state: any) => state.sidebar.isOpen)
  const openSubmenus = useSelector((state: RootState) => state.sidebar.openSubmenus)

  const toggleDrawer = () => {
    dispatch(toggleSidebar())
  }

  const theme = useTheme()
  const { t } = useTranslation()

  const { menus } = useMemo(() => {
    const menus: Menu[] = [
      {
        name: t('appbar.home'),
        link: '/home',
        icon: <IconHome />,
      },
      {
        name: t('appbar.users'),
        icon: <IconUsersGroup />,
        link: '/users'
      },
      {
        name: t('appbar.medicines'),
        icon: <IconMedicineSyrup />,
        link: '/medicines'
      },
      {
        name: t('appbar.retrieve'),
        link: '/undefined-1',
        submenus: [
          {
            name: t('appbar.retrieve_user_medicines'),
            link: '/user_medicines/deleted',
            icon: <IconMedicalCrossCircle />
          },
        ]
      },
      {
        name: t('appbar.changes'),
        link: '/undefined-2',
        submenus: [
          {
            name: t('appbar.changes_professional_users'),
            link: '/professional_users/change',
            icon: <IconNurse />
          },
          {
            name: t('appbar.changes_medicine_users'),
            link: '/user_medicines/change',
            icon: <IconPills />
          },
        ]
      }
    ]
    return { menus }
  }, [t])

  const renderMenu = (menu: Menu) => {
    if (!menu.submenus) {
      return (
        <ListItem key={`menu-${menu.link}`} component={RouterLink} to={menu.link!}>
          <ListItemIcon>{menu.icon}</ListItemIcon>
          {isOpen && <ListItemText primary={menu.name} />}
        </ListItem>
      )
    }

    return <Box key={`menu-${menu.link}`}>
      <Divider />
      <ListItem onClick={() => dispatch(toggleSubmenu(menu.name))}>
        <ListItemIcon>
          {openSubmenus.includes(menu.name) ? <ExpandLess /> : <ExpandMore />}
        </ListItemIcon>
        {isOpen && <ListItemText primary={menu.name} sx={{ color: theme.typography.body2 }} />}
      </ListItem>

      {menu.submenus && (
        <Collapse in={openSubmenus.includes(menu.name)} timeout="auto" unmountOnExit>
          <List component="span" disablePadding>
            {menu.submenus.map((submenu: SubMenu) => (
              <ListItem key={`sub-${submenu.name}`} component={RouterLink} to={submenu.link}>
                <ListItemIcon>{submenu.icon}</ListItemIcon>
                {isOpen && <ListItemText primary={submenu.name} />}
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </Box>
  }

  return (
    <CustomDrawer variant="permanent" open={isOpen}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <IconChevronLeft />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {menus.map(renderMenu)}
      </List>
    </CustomDrawer>
  )
}

