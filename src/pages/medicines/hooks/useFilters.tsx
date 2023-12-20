
import { useTranslation } from 'react-i18next'
import { IconCheck, IconLetterN, IconUserPlus, IconUserCheck, IconCalendarTime } from '@tabler/icons-react'

import { Filter } from '@/common/components/filters/Filters'
import { SelectorValue } from '@/common/components/dialog/FilterFieldDialog'
import { User } from '@/interfaces/backend/user'

interface UseFilters {
  filters: (Filter | { divider: boolean })[]
}

export const useFilters = (users: User[]): UseFilters => {
  const { t } = useTranslation()

  const professionals = users?.map((user: User) => ({ id: user.id, label: user.username }) as SelectorValue) ?? []

  const filters: (Filter | { divider: boolean })[] = [
    {
      new: false,
      key: 'inUse',
      label: t('medicines.filters.in_use'),
      type: 'boolean',
      urlKey: 'inUse',
      value: 'true',
      icon: <IconCheck />,
      static: true
    },
    {
      new: true,
      key: 'name',
      label: t('medicines.filters.name'),
      type: 'text',
      urlKey: 'name',
      value: '',
      icon: <IconLetterN />,
      static: false
    },
    { divider: true },
    {
      new: true,
      key: 'createdById',
      label: t('medicines.filters.created_by'),
      type: 'select',
      selectorValues: professionals,
      urlKey: 'createdById',
      value: '',
      icon: <IconUserPlus />,
      static: false
    },
    {
      new: true,
      key: 'updatedById',
      label: t('medicines.filters.updated_by'),
      type: 'select',
      selectorValues: professionals,
      urlKey: 'updatedById',
      value: '',
      icon: <IconUserCheck />,
      static: false
    },
    { divider: true },
    {
      new: true,
      key: 'createdAtStartDate',
      label: t('medicines.filters.created_at_start_date'),
      type: 'date',
      urlKey: 'createdAtStartDate',
      value: new Date(),
      icon: <IconCalendarTime />,
      static: false
    },
    {
      new: true,
      key: 'createdAtEndDate',
      label: t('medicines.filters.created_at_end_date'),
      type: 'date',
      urlKey: 'createdAtEndDate',
      value: new Date(),
      icon: <IconCalendarTime />,
      static: false
    },
    { divider: true },
    {
      new: true,
      key: 'updatedAtStartDate',
      label: t('medicines.filters.updated_at_start_date'),
      type: 'date',
      urlKey: 'updatedAtStartDate',
      value: new Date(),
      icon: <IconCalendarTime />,
      static: false
    },
    {
      new: true,
      key: 'updatedAtEndDate',
      label: t('medicines.filters.updated_at_end_date'),
      type: 'date',
      urlKey: 'updatedAtEndDate',
      value: new Date(),
      icon: <IconCalendarTime />,
      static: false
    }
  ]

  return { filters }
}