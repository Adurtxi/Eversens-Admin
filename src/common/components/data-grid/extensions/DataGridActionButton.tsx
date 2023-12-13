
import { MoreVert } from '@mui/icons-material'
import { Box, Fade, IconButton, ListItemIcon, Menu, MenuItem, useTheme } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useState } from 'react'
import { GridAction } from '../DataGrid'

export default function MyDataGridActionButton(): GridColDef {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const [selectedRow, setSelectedRow] = useState<any|null>(null)

  return {
    field: 'actions',
    headerName: 'Acciones',
    align: 'right',
    headerAlign: 'right',
    filterable: false,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Box key={`action-${params.id}`}>
          <IconButton
            onClick={(event) => {
              event.stopPropagation()
              setSelectedRow(params.row)
              handleClick(event)
            }}
            sx={{ color: theme.palette.text.primary }}
          >
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            TransitionComponent={Fade}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{vertical: 'top', horizontal: 'left' }}
          >
            <Box onMouseLeave={handleClose}>
              {params.row.actions
                .filter((action: GridAction) => action.isVisible)
                .map((action: GridAction) => (
                  <MenuItem key={`row-${params.row}-action-${action.name}`}
                    onClick={() => {
                      action.onClick(selectedRow)
                      handleClose()
                    }}
                  >
                    <ListItemIcon>
                      {action.icon}
                    </ListItemIcon>
                    {action.name}
                  </MenuItem>
                ))}
            </Box>
          </Menu>
        </Box>
      )
    },
  }
}
