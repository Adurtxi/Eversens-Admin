import DataGridLayout from '@/common/layouts/DataGridLayout'
import { Add } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

export default function UsersPage(): JSX.Element {
  const { t } = useTranslation()
  
  return (
    <DataGridLayout
      pageName={t('users.users')}
      primaryActionButton={{
        text: t('users.add_user'),
        icon: <Add />,
        onButtonClick: () => console.log('Nuevo usuario'),
      }}
      handleSearch={() => console.log('Search')} 
      dataGridConfig={{
        rows: [],
        columns: [],
        actions: [],
        error: null,
        isLoading: false
      }} />
  )
}
