import { Button, Card, Container, Stack, Typography } from '@mui/material'
import { ReactElement, useState } from 'react'
import { IconSearch } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

import MyDataGrid from '../components/data-grid/DataGrid'
import Filters, { Filter } from '../components/filters/Filters'

interface DataGridConfig {
  rows: any[]
  columns: any[]
  actions: any[]
  error: Error | null
  isLoading: boolean
}

interface FiltersConfig {
  filters: (Filter | { divider: boolean })[],
  isLoading: boolean,
  error: Error | null
}

interface DataGridLayoutProps {
  pageName: string
  button: {
    text: string
    icon: ReactElement
    onButtonClick: () => void
    disabled?: boolean
  }
  onSearchClick: (values: { [x: string]: string | number | boolean | Date | null }) => void
  filtersConfig?: FiltersConfig
  dataGridConfig: DataGridConfig
}

export default function DataGridLayout({ pageName, button, filtersConfig, dataGridConfig, onSearchClick }: DataGridLayoutProps): JSX.Element {
  const { t } = useTranslation()

  const { rows, columns, actions, error, isLoading: isDataGridLoading } = dataGridConfig

  const [selectedFilters, setSelectedFilters] = useState<Filter[] | []>(
    filtersConfig?.filters.filter((x: Filter | { divider: boolean }) => 'static' in x && x.static && x) as Filter[] ?? []
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
      selectedFilters.filter((filter: Filter) => filter.key !== key)
    )
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
      <Stack direction='row' alignItems='center' justifyContent='space-between' mb={4}>
        <Typography variant='h4'>{pageName}</Typography>
        <Button variant='contained' color='secondary' startIcon={button.icon} onClick={button.onButtonClick} disabled={button.disabled}>
          {button.text}
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
        <Button variant='contained' color='primary' startIcon={<IconSearch />} onClick={handleOnSearchClick} disabled={isDataGridLoading}>
          {t('common.search')}
        </Button>
      </Stack>
      }
      <Card sx={{ p: 1 }}>
        <MyDataGrid rows={rows} columns={columns} actions={actions} error={error} isLoading={isDataGridLoading} />
      </Card>
    </Container>
  )
}
