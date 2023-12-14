import { Add } from '@mui/icons-material'
import { GridRowParams } from '@mui/x-data-grid'
import { IconCalendarTime, IconCheck, IconEdit, IconEye, IconLetterN, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import DataGridLayout from '@/common/layouts/DataGridLayout'
import { GridAction, ExtendedGridColDef } from '@/common/components/data-grid/DataGrid'
import { Medicine } from '@/interfaces/backend/medicine'
import { getMedicines } from '@/services/medicine/medicine.service'
import { NewMedicineDialog } from './components/NewMedicineDialog'
import { useQuery } from '@tanstack/react-query'
import { EditMedicineDialog } from './components/EditMedicineDialog'
import { Filter } from '@/common/components/filters/Filters'

export default function MedicinesPage(): JSX.Element {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const handleCreateDialogOpen = () => setCreateDialogOpen(true)
  const handleCreateDialogClose = () => setCreateDialogOpen(false)

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

  const handleEditClick = (medicine: Medicine) => {
    setSelectedMedicine(medicine), setEditDialogOpen(true)
  }
  const handleEditDialogClose = () => {
    setSelectedMedicine(null), setEditDialogOpen(false)
  }

  const { t } = useTranslation()

  const { data, isLoading, error } = useQuery<Medicine[], Error>(
    {
      queryKey: ['getMedicines'],
      queryFn: getMedicines,
      refetchOnWindowFocus: false
    }
  )

  const actions: GridAction[] = [
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
      onClick: handleEditClick
    },
    {
      icon: <IconTrash />,
      name: t('medicines.datagrid.actions.delete'),
      isBlocked: (): boolean => true,
      onClick: (row: GridRowParams): void => {
        console.log('Eliminar', row)
      },
    },
  ]

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

  const rows: any = data?.map(x => ({
    ...x,
    createdBy: x.auditInfo.createdBy?.username,
    createdAt: x.auditInfo.createdAt,
    updatedBy: x.auditInfo.updatedBy?.username,
    updatedAt: x.auditInfo.updatedAt,
    inUse: true,
  }))

  const onSearchClick = (values: any) => {
    console.log(values)
  }

  const filters: Filter[] = [
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

  return (
    <>
      <DataGridLayout
        onSearchClick={onSearchClick}
        pageName={t('medicines.medicines')}
        button={{
          text: t('medicines.add_medicine'),
          icon: <Add />,
          onButtonClick: handleCreateDialogOpen,
        }}
        dataGridConfig={{ rows, columns, actions, error, isLoading }}
        filters={filters}
      />
      <NewMedicineDialog open={createDialogOpen} handleClose={handleCreateDialogClose} />
      {selectedMedicine && <EditMedicineDialog open={editDialogOpen} medicine={selectedMedicine} handleClose={handleEditDialogClose} />}
    </>
  )
}
