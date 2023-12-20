import { GridRowParams } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'

import { ExtendedGridColDef } from '@/common/components/data-grid/DataGrid';

export const useColumns = (): { columns: ExtendedGridColDef[] } => {
  const { t } = useTranslation()

  const columns: ExtendedGridColDef[] = [
    {
      field: 'name',
      headerName: t('medicines.datagrid.columns.name'),
      flex: 2,
      hasAction: true,
      action: (row: GridRowParams) => console.log('Action Columna ID', row),
    },
    { field: 'createdAt', valueType: 'datetime', headerName: t('medicines.datagrid.columns.created_at'), flex: 1 },
    { field: 'updatedAt', valueType: 'datetime', headerName: t('medicines.datagrid.columns.updated_at'), flex: 1 },
    { field: 'createdBy', headerName: t('medicines.datagrid.columns.created_by'), flex: 1 },
    { field: 'inUse', headerName: t('medicines.datagrid.columns.in_use'), flex: 1 },
  ]

  return { columns }
}