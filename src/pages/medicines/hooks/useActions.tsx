import { GridRowParams } from '@mui/x-data-grid'
import { IconEye, IconTrash, IconEdit } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

import { GridAction } from '@/common/components/data-grid/DataGrid'

export const useActions = (handleEditDialogOpen: (row: any) => void): { actions: GridAction[] } => {
  const { t } = useTranslation();

  return { actions: [
    {
      icon: <IconEye />,
      name: t('medicines.datagrid.actions.detail'),
      isVisible: (): boolean => true,
      onClick: (row: GridRowParams): void => {
        console.log('Detalle', row)
      },
    },
    {
      icon: <IconEdit />,
      name: t('medicines.datagrid.actions.edit'),
      isVisible: (): boolean => true,
      onClick: handleEditDialogOpen
    },
    {
      icon: <IconTrash />,
      name: t('medicines.datagrid.actions.delete'),
      isBlocked: (): boolean => true,
      onClick: (row: GridRowParams): void => {
        console.log('Eliminar', row)
      },
    },
  ]}
}