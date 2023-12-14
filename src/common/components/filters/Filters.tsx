import { Box, Chip, Fade, ListItemIcon, Menu, MenuItem, Stack } from '@mui/material'
import { IconEdit, IconPlus } from '@tabler/icons-react'
import { ReactElement, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FilterDialog } from './components/FilterDialog'

export interface Filter {
  new: boolean
  key: string
  label: string
  type: 'text' | 'number' | 'date' | 'boolean' | 'select' | 'multi-select'
  urlKey: string
  value: string | number | boolean | null | Date
  icon: ReactElement
  static: boolean
}

interface FiltersProps {
  filters: Filter[]
  selectedFilters: Filter[]
  handleFilterDelete: (key: string) => void
  handleUpdateSelectedFilters: (filter: Filter) => void
}

const Filters = ({ filters, selectedFilters, handleFilterDelete, handleUpdateSelectedFilters }: FiltersProps) => {
  const { t } = useTranslation()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleMenuClose = () => setAnchorEl(null);

  const [selectedFilter, selectFilter] = useState<null | Filter>(null)

  const handleSelectFilterAndOpenDialog = (filter: Filter) => {
    selectFilter(filter)
    handleOpenDialog()
  }

  const [open, setOpen] = useState<boolean>(false)
  const handleOpenDialog = () => setOpen(true)
  const handleCloseDialog = () => setOpen(false)

  const notUsingFilters = filters.filter(filter => !selectedFilters.some(selectedFilter => selectedFilter.key === filter.key))

  return <>
    <Stack direction='row' alignItems='center' justifyContent='space-between' gap={1}>
      {selectedFilters.filter(x => x.static).map((filter: Filter) => {
        return <Chip key={filter.key}
          icon={filter.icon}
          label={filter.label}
          deleteIcon={<IconEdit />}
          onClick={() => handleSelectFilterAndOpenDialog(filter)}
          onDelete={() => handleSelectFilterAndOpenDialog(filter)}
        />
      })}

      {selectedFilters.filter(x => !x.static).map((filter: Filter) => {
        return <Chip key={filter.key}
          icon={filter.icon}
          label={filter.label}
          onClick={() => handleSelectFilterAndOpenDialog(filter)}
          onDelete={() => handleFilterDelete(filter.key)}
        />
      })}

      <Chip variant='outlined' key={'add_new_filter'} sx={{ border: 0, ml: 1 }}
        icon={<IconPlus />}
        label={t('common.new')}
        onClick={handleMenuClick}
        disabled={notUsingFilters.length === 0}
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} TransitionComponent={Fade}>
        <Box onMouseLeave={handleMenuClose}>
          {notUsingFilters.map((filter: Filter) => (
            <MenuItem key={`menu-${filter.key}`}
              onClick={() => {
                handleSelectFilterAndOpenDialog(filter)
                handleMenuClose()
              }}
            >
              <ListItemIcon>{filter.icon}</ListItemIcon>
              {filter.label}
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </Stack>
    {
      selectedFilter && <FilterDialog 
        filter={selectedFilter} 
        handleUpdateSelectedFilters={handleUpdateSelectedFilters} 
        open={open} 
        handleClose={handleCloseDialog} 
      />
    }
  </>
}

export default Filters