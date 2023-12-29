import { useState } from 'react'

import { Filter, FilterGroup } from '@/common/components/filters/Filters'

export interface FiltersConfig {
  filters: FilterGroup[],
  isLoading: boolean,
  error: Error | null
}

interface UseFiltersProps {
  filtersConfig?: {
    filters: FilterGroup[],
  }
  handleSearch: (filterValues: { [key: string]: string | number | boolean | Date | null }) => void
}

export const useFilters = ({ filtersConfig, handleSearch }: UseFiltersProps) => {
  const [selectedFilters, setSelectedFilters] = useState<Filter[] | []>(
    filtersConfig?.filters
      .flatMap(x => x.filters)
      .filter((x: Filter | { divider: boolean }) => 'static' in x && x.static && x) ?? []
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

  const handleSearchClick = () => {
    const filterValues = selectedFilters.reduce(
      (acc, filter: Filter) => ({ ...acc, [filter.urlKey]: filter.value }),
      {} as { [key: string]: string | number | boolean | Date | null }
    )
    handleSearch(filterValues)
  }

  return { selectedFilters, handleUpdateSelectedFilters, handleFilterDelete, handleSearchClick }
}