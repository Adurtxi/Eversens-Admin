import { Outlet } from 'react-router-dom'
import { Box, Container, Toolbar } from '@mui/material'
import MyAppBar from '../appbar/AppBar'
import MySidebar from '../appbar/Sidebar'

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
        <Container>
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
}
