import { Add } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import DataGridLayout from '@/common/layouts/DataGridLayout'
import { User } from '@/interfaces/backend/user'

import { NewUserDialog } from './components/NewUserDialog'
import { EditUserDialog } from './components/EditUserDialog'

import { useActions } from './hooks/useActions'
import { useDialogs } from './hooks/useDialogs'
import { useFilters } from './hooks/useFilters'
import { useColumns } from './hooks/useColumns'
import { useUsersQuery } from './hooks/useUsersQuery'
import { useProfessionalUsersQuery } from './hooks/useProfessionalUsersQuery'

export default function UsersPage(): JSX.Element {
  const { t } = useTranslation()

  const {
    searchParams, setSearchParams, createDialogOpen, handleCreateDialogOpen,
    handleCreateDialogClose, editDialogOpen, selectedUser, handleEditClick, handleEditDialogClose
  } = useDialogs()

  const { actions } = useActions(handleEditClick)
  const { columns } = useColumns()

  const { professionalUsers, isProfessionalUsersLoading, professionalUsersError } = useProfessionalUsersQuery()

  const { filters } = useFilters(professionalUsers ?? [])

  const { users, isUsersLoading, usersError, fetchNextPage, hasNextPage } = useUsersQuery(searchParams)

  const rows: any = users?.map((x: User) => ({
    ...x,
    createdBy: x.auditInfo.createdBy?.username,
    createdAt: x.auditInfo.createdAt,
    updatedBy: x.auditInfo.updatedBy?.username,
    updatedAt: x.auditInfo.updatedAt,
    inUse: true,
  }))

  const handleSearch = (values: any) => setSearchParams(values)

  return (
    <>
      <DataGridLayout
        pagination={{ fetchNextPage, hasNextPage }}
        handleSearch={handleSearch}
        pageName={t('users.users')}
        primaryActionButton={{
          text: t('users.add_user'),
          icon: <Add />,
          onButtonClick: handleCreateDialogOpen,
          disabled: isUsersLoading
        }}
        filtersConfig={{ filters, isLoading: isProfessionalUsersLoading, error: professionalUsersError }}
        dataGridConfig={{ rows, columns, actions, error: usersError, isLoading: isUsersLoading }}
      />
      <NewUserDialog open={createDialogOpen} handleClose={handleCreateDialogClose} />
      {selectedUser && <EditUserDialog open={editDialogOpen} user={selectedUser} handleClose={handleEditDialogClose} />}
    </>
  )
}

