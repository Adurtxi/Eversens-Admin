import { Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import DataGridLayout from '@/common/layouts/DataGridLayout'
import { Medicine } from '@/interfaces/backend/medicine'

import { NewMedicineDialog } from './components/NewMedicineDialog'
import { EditMedicineDialog } from './components/EditMedicineDialog'

import { useActions } from './hooks/useActions'
import { useDialogs } from './hooks/useDialogs'
import { useFilters } from './hooks/useFilters'
import { useColumns } from './hooks/useColumns'
import { useMedicinesQuery } from './hooks/useMedicinesQuery'
import { useUsersQuery } from './hooks/useUsersQuery'

export default function MedicinesPage(): JSX.Element {
  const { t } = useTranslation()

  const { 
    searchParams, setSearchParams, createDialogOpen, handleCreateDialogOpen,
    handleCreateDialogClose, editDialogOpen, selectedMedicine, handleEditClick, handleEditDialogClose 
  } = useDialogs()

  const { actions } = useActions(handleEditClick)
  const { columns } = useColumns()

  const { users, isUsersLoading, usersError } = useUsersQuery()

  const { filters } = useFilters(users ?? [])

  const { medicines, isMedicinesLoading, medicinesError, fetchNextPage, hasNextPage } = useMedicinesQuery(searchParams)

  const rows: any = medicines?.map((x: Medicine) => ({
    ...x,
    createdBy: x.auditInfo.createdBy?.username,
    createdAt: x.auditInfo.createdAt,
    updatedBy: x.auditInfo.updatedBy?.username,
    updatedAt: x.auditInfo.updatedAt,
    inUse: true,
  }))

  const onSearchClick = (values: any) => setSearchParams(values)

  return (
    <>
      <Button onClick={() => fetchNextPage()} disabled={!hasNextPage}>Cargar más datos</Button>
      <DataGridLayout
        onSearchClick={onSearchClick}
        pageName={t('medicines.medicines')}
        button={{
          text: t('medicines.add_medicine'),
          icon: <Add />,
          onButtonClick: handleCreateDialogOpen,
          disabled: isMedicinesLoading
        }}
        filtersConfig={{ filters, isLoading: isUsersLoading, error: usersError }}
        dataGridConfig={{ rows, columns, actions, error: medicinesError, isLoading: isMedicinesLoading }}
      />
      <NewMedicineDialog open={createDialogOpen} handleClose={handleCreateDialogClose} />
      {selectedMedicine && <EditMedicineDialog open={editDialogOpen} medicine={selectedMedicine} handleClose={handleEditDialogClose} />}
    </>
  )
}

