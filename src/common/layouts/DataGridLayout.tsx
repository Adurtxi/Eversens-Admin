import { Button, Card, Container, Stack, Typography } from '@mui/material'
import { ReactElement } from 'react'
import { IconSearch } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

import MyDataGrid from '../components/data-grid/DataGrid'
import Filters from '../components/filters/Filters'
import { FiltersConfig, useFilters } from './hooks/useFilters'

interface DataGridConfig {
  rows: any[]
  columns: any[]
  actions: any[]
  error: Error | null
  isLoading: boolean
}

interface DataGridLayoutProps {
  pageName: string
  primaryActionButton: {
    text: string
    icon: ReactElement
    onButtonClick: () => void
    disabled?: boolean
  }
  handleSearch: (values: { [x: string]: string | number | boolean | Date | null }) => void
  pagination?: {
    fetchNextPage: () => void
    hasNextPage: boolean
  }
  filtersConfig?: FiltersConfig
  dataGridConfig: DataGridConfig
}

export default function DataGridLayout({ pageName, primaryActionButton, filtersConfig, dataGridConfig, handleSearch, pagination }: DataGridLayoutProps): JSX.Element {
  const { t } = useTranslation()

  const { rows, columns, actions, error, isLoading: isDataGridLoading } = dataGridConfig
  const { icon: primaryIcon, onButtonClick: handlePrimaryClick, disabled: isPrimaryDisabled, text: primaryText } = primaryActionButton

  const { selectedFilters, handleFilterDelete, handleUpdateSelectedFilters, handleSearchClick } = useFilters({filtersConfig, handleSearch})

  return (
    <Container sx={{ mt: 3 }}>
      <Stack direction='row' alignItems='center' justifyContent='space-between' mb={4}>
        <Typography variant='h4'>{pageName}</Typography>
        <Button variant='contained' color='secondary' startIcon={primaryIcon} onClick={handlePrimaryClick} disabled={isPrimaryDisabled}>
          {primaryText}
        </Button>
      </Stack>

      {filtersConfig && <Stack direction='row' alignItems='center' justifyContent='space-between' mb={1}>
        <Filters
          filters={filtersConfig.filters}
          isFiltersLoading={filtersConfig.isLoading}
          selectedFilters={selectedFilters}
          handleFilterDelete={handleFilterDelete}
          handleUpdateSelectedFilters={handleUpdateSelectedFilters}
        />
        <Button variant='contained' color='primary' startIcon={<IconSearch />} onClick={handleSearchClick} disabled={isDataGridLoading}>
          {t('common.search')}
        </Button>
      </Stack>
      }
      <Card sx={{ p: 1 }}>
        <MyDataGrid rows={rows} columns={columns} actions={actions} error={error} isLoading={isDataGridLoading} pagination={pagination}/>
      </Card>
    </Container>
  )
}
