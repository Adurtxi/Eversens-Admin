import { Button, Card, Container, Stack, Typography } from '@mui/material'
import { ReactElement, useState } from 'react'
import { IconSearch } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

import MyDataGrid from '../components/data-grid/DataGrid'
import Filters, { Filter } from '../components/filters/Filters'

interface DataGridLayoutProps {
  pageName: string
  button: {
    text: string
    icon: ReactElement
    onButtonClick: () => void
  }
  onSearchClick: (values: {[x: string]: string | number | boolean | Date | null}) => void
  filters: Filter[]
  dataGridConfig: {
    rows: any[]
    columns: any[]
    actions: any[]
    error: Error | null
    isLoading: boolean
  }
}

export default function DataGridLayout({ pageName, button, filters, dataGridConfig, onSearchClick }: DataGridLayoutProps): JSX.Element {
  const { t } = useTranslation()

  const { rows, columns, actions, error, isLoading } = dataGridConfig

  const [selectedFilters, setSelectedFilters] = useState<Filter[] | []>(
    filters.filter((filter: Filter) => filter.static) ?? []
  )

  const handleUpdateSelectedFilters = (filter: Filter): void => {
    if (!filter.new) 
      setSelectedFilters(selectedFilters.map((selectedFilter: Filter) => selectedFilter.key === filter.key ? filter : selectedFilter))
    else {
      filter.new = false
      setSelectedFilters([...selectedFilters, filter])
    }
  }

  const handleFilterDelete = (key: string): void => {
    setSelectedFilters(
      selectedFilters.filter((filter: Filter) => filter.key !== key
    ))
  }
  const handleOnSearchClick = () => {
    const filterValues = selectedFilters.reduce(
      (acc, filter: Filter) => ({ ...acc, [filter.urlKey]: filter.value }),
      {} as { [key: string]: string | number | boolean | Date | null }
    )
    onSearchClick(filterValues)
  }

  return (
    <Container sx={{ mt: 3 }}>
      <Stack direction='row' alignItems='center' justifyContent='space-between' mb={3}>
        <Typography variant='h4'>{pageName}</Typography>
        <Button variant='contained' startIcon={button.icon} onClick={button.onButtonClick}>
          {button.text}
        </Button>
      </Stack>

      <Card sx={{ p: 1 }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={1}>
          <Filters 
            filters={filters} 
            selectedFilters={selectedFilters} 
            handleFilterDelete={handleFilterDelete} 
            handleUpdateSelectedFilters={handleUpdateSelectedFilters}
          />
          <Button variant='contained' color='secondary' startIcon={<IconSearch/>} onClick={handleOnSearchClick}>
            { t('common.search') }
          </Button>
        </Stack>
        <MyDataGrid rows={rows} columns={columns} actions={actions} error={error} isLoading={isLoading} />
      </Card>
    </Container>
  )
}
