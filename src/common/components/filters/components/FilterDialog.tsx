import { useFormik } from 'formik'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import FilterFieldDialog from '../../dialog/FilterFieldDialog'
import { Filter } from '../Filters'

interface FilterDialogProps {
  open: boolean
  handleClose: () => void
  filter: Filter
  handleUpdateSelectedFilters: (filter: Filter) => void
}

export const FilterDialog = ({ open, handleClose, filter, handleUpdateSelectedFilters }: FilterDialogProps) => {
  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: {
      filterValue: false,
      submit: null,
    },
    onSubmit: (event, helpers) => {
      try {
        handleUpdateSelectedFilters({ ...filter, value: event.filterValue })
        handleClose()
      } catch (err: any) {
        helpers.setStatus({ success: false })
        helpers.setErrors({ submit: err.message })
        helpers.setSubmitting(false)
      }
    },
  })

  useEffect(() => {
    open && formik.resetForm()
    formik.setFieldValue('filterValue', filter.value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return <FilterFieldDialog
    open={open}
    handleClose={handleClose}
    title={filter.label}
    formik={formik}
    type={filter.type}
    fieldName='filterValue'
    label={filter.label}
    selectorValues={filter.selectorValues}
    buttonText={(filter.new) ? t('common.add') : t('common.update')}
  />
}