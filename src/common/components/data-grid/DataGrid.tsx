import { Box, Button, LinearProgress, Stack, useTheme } from '@mui/material'
import { DataGrid, GridCellParams, GridColDef, GridFooter, GridRowParams, esES } from '@mui/x-data-grid'
import { ReactElement, useMemo } from 'react'
import MyDataGridActionButton from './extensions/DataGridActionButton'
import { useTranslation } from 'react-i18next'
import CustomNoRowsOverlay from './extensions/DataGridNoData'
import CustomNoFilterRowsOverlay from './extensions/DataGridNoFilterData'
import { formatDateTime } from '@/common/helpers/date-helper'

export interface GridAction {
  icon: ReactElement,
  name: string
  isVisible?: (row: GridRowParams<any>) => boolean
  isBlocked?: (row: GridRowParams<any>) => boolean
  onClick: (row: any) => void
}

export type ExtendedGridColDef = GridColDef & {
  action?: (row: GridRowParams<any>) => void
  hasAction?: boolean,
  valueType?: 'string' | 'number' | 'boolean' | 'date' | 'datetime' | 'time' | 'currency' | 'price' | 'percentage' | 'custom'
}

interface DataTableProps {
  rows: any[]
  columns: ExtendedGridColDef[],
  actions: GridAction[],
  error: Error | null,
  isLoading: boolean,
  pagination?: {
    fetchNextPage: () => void
    hasNextPage: boolean
  }
}

const RenderCell = ({ params, column }: any) => {
  const theme = useTheme();

  return (
    <Box
      key={params.GridRowId}
      onClick={() => column.action && column.action(params)}
      sx={{
        color: theme.palette.primary.main,
        cursor: 'pointer',
      }}
    >
      {params.value}
    </Box>
  );
}

export default function MyDataGrid({ rows = [], columns, actions, error, isLoading, pagination }: DataTableProps) {
  const { t } = useTranslation()
  // const [selectionModel, setSelectionModel] = useState<GridRowId[]>([])

  const pageSizeOptions = [5, 10, 25, 50]

  const updatedColumns = useMemo(() =>
    columns.map((column: ExtendedGridColDef) => ({
      ...column,
      renderCell: (params: GridCellParams): any => {
        return (column.hasAction)
          ? RenderCell({ params, column })
          : params.value
      }
    })),
    [columns]
  )

  const actionButtonColumn = MyDataGridActionButton();

  const allColumns = useMemo(() => {
    return [...updatedColumns, actionButtonColumn];
  }, [updatedColumns, actionButtonColumn])

  const updatedRows = useMemo(() => {
    const formatRowDates = (row: any) => {
      return columns.reduce((acc, column) =>
        column.valueType === 'datetime'
          ? { ...acc, [column.field]: row[column.field] != null ? formatDateTime(row[column.field]) : '' }
          : acc
        , { ...row });
    }

    const createActions = (row: any) => {
      return actions.map((action: GridAction) => ({
        ...action,
        isVisible: action.isVisible ? action.isVisible(row) : true,
        isBlocked: action.isBlocked ? action.isBlocked(row) : false,
      }));
    }

    return rows.map((row) => ({
      ...formatRowDates(row),
      actions: createActions(row),
    }))
  }, [rows, actions, columns])

  if (error) return <Box>
    {t('datagrid.error')} {error.message}
  </Box>

  const customFooter = () => {
    return <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
      <Box/>
      { pagination && <Button onClick={pagination.fetchNextPage} disabled={!pagination.hasNextPage}>{t('common.load_more')}</Button> }
      <GridFooter />
    </Stack>
  }

  return (
    <DataGrid
      style={{ height: 600 }}
      rows={updatedRows}
      columns={allColumns}
      pageSizeOptions={pageSizeOptions}
      // rowSelectionModel={selectionModel}
      // onRowSelectionModelChange={setSelectionModel}
      //ONCLICK
      // onCellClick={(params) => console.log('Cell click', params)}
      // onCellDoubleClick={(params) => console.log('Cell double click', params)}
      // onRowClick={(params) => console.log('Row click', params)}
      // onRowDoubleClick={(params) => console.log('Row double click', params)}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      disableRowSelectionOnClick
      checkboxSelection
      localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      loading={isLoading}
      slots={{
        loadingOverlay: LinearProgress,
        noRowsOverlay: CustomNoRowsOverlay,
        noResultsOverlay: CustomNoFilterRowsOverlay,
        footer: customFooter,

      }}
    // filterMode="server"
    // onFilterModelChange={onFilterChange}
    // loading={isLoading}
    />
  )
}
