import { Grid } from '@mui/material'
import React from 'react'

interface DataLayoutProps {
  leftComponent: React.ReactNode
  centerComponent: React.ReactNode
  rightComponent: React.ReactNode
}

const DataLayout: React.FC<DataLayoutProps> = ({
  leftComponent,
  centerComponent,
  rightComponent,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={2}>
        {leftComponent}
      </Grid>
      <Grid item xs={12} sm={8}>
        {centerComponent}
      </Grid>
      <Grid item xs={12} sm={2}>
        {rightComponent}
      </Grid>
    </Grid>
  )
}

export default DataLayout
