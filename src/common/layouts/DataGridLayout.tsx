import { Button, Card, Container, Stack, Typography } from '@mui/material'
import { ReactElement } from 'react';
import MyDataGrid from '../components/data-grid/DataGrid';
import { IconSearch } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

interface DataGridLayoutProps {
  pageName: string
  button: {
    text: string
    icon: ReactElement;
    onButtonClick: () => void
  }
  onSearchClick: () => void
  filters: ReactElement[],
  dataGridConfig: {
    rows: any[],
    columns: any[],
    actions: any[],
    error: Error | null,
    isLoading: boolean,
  }
}

export default function DataGridLayout({ pageName, button, filters, dataGridConfig, onSearchClick }: DataGridLayoutProps): JSX.Element {
  const { t } = useTranslation()

  const { rows, columns, actions, error, isLoading } = dataGridConfig

  return (
    <Container sx={{ mt: 3 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h4">{pageName}</Typography>

        <Button
          variant="contained"
          startIcon={button.icon}
          onClick={button.onButtonClick}
        >
          {button.text}
        </Button>
      </Stack>

      <Card sx={{ p: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          {filters}
          <Button
            variant="contained"
            color="secondary"
            startIcon={<IconSearch/>}
            onClick={onSearchClick}
          >
            { t('common.search') }
          </Button>
        </Stack>
        <MyDataGrid rows={rows} columns={columns} actions={actions} error={error} isLoading={isLoading} />
      </Card>
    </Container>
  )
}
