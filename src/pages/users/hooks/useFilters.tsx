
import { useTranslation } from 'react-i18next'
import { IconCheck, IconUserPlus, IconUserCheck, IconCalendarTime } from '@tabler/icons-react'

import { FilterGroup } from '@/common/components/filters/Filters'
import { SelectorValue } from '@/common/components/dialog/FilterFieldDialog'
import { User } from '@/interfaces/backend/user'

interface UseFilters {
  filters: FilterGroup[]
}

export const useFilters = (users: User[]): UseFilters => {
  const { t } = useTranslation()

  const professionals = users?.map((user: User) => ({ id: user.id, label: user.username }) as SelectorValue) ?? []

  const filters: FilterGroup[] = [
    {
      label: '',
      filters: [
        {
          new: false,
          key: 'inUse',
          label: t('users.filters.in_use'),
          type: 'boolean',
          urlKey: 'inUse',
          value: 'true',
          icon: <IconCheck />,
          static: true
        },
      ]
    },
    {
      label: '',
      filters: [
        {
          new: true,
          key: 'createdById',
          label: t('users.filters.created_by'),
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
          label: t('users.filters.updated_by'),
          type: 'select',
          selectorValues: professionals,
          urlKey: 'updatedById',
          value: '',
          icon: <IconUserCheck />,
          static: false
        },
      ]
    },
    {
      label: '',
      filters: [
        {
          new: true,
          key: 'createdAtStartDate',
          label: t('users.filters.created_at_start_date'),
          type: 'date',
          urlKey: 'createdAtStartDate',
          value: new Date(),
          icon: <IconCalendarTime />,
          static: false
        },
        {
          new: true,
          key: 'createdAtEndDate',
          label: t('users.filters.created_at_end_date'),
          type: 'date',
          urlKey: 'createdAtEndDate',
          value: new Date(),
          icon: <IconCalendarTime />,
          static: false
        },
      ]
    },
    {
      label: '',
      filters: [
        {
          new: true,
          key: 'updatedAtStartDate',
          label: t('users.filters.updated_at_start_date'),
          type: 'date',
          urlKey: 'updatedAtStartDate',
          value: new Date(),
          icon: <IconCalendarTime />,
          static: false
        },
        {
          new: true,
          key: 'updatedAtEndDate',
          label: t('users.filters.updated_at_end_date'),
          type: 'date',
          urlKey: 'updatedAtEndDate',
          value: new Date(),
          icon: <IconCalendarTime />,
          static: false
        }
      ]
    }
  ]

  return { filters }
}