import { Outlet } from 'react-router-dom'
import { Box, Toolbar } from '@mui/material'
import MyAppBar from '../components/appbar/AppBar'
import MySidebar from '../components/appbar/Sidebar'

export default function Layout(): JSX.Element {
  return (
    <Box sx={{ display: 'flex' }}>
      <MyAppBar />
      <MySidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}
