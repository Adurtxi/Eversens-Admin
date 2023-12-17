import { Button, DialogActions, DialogContent, DialogTitle, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { CustomDialog } from './Dialog'
import MyDateTimePicker from '../date/DatePicker'

interface TextFieldProps {
  formik: any,
  fieldName: string
  label: string
  type?: 'text' | 'number'
}
const FormikTextAndNumberField: React.FC<TextFieldProps> = ({ formik, fieldName, label, type }) => (
  <TextField
    error={!!(formik.touched[fieldName] && formik.errors[fieldName])}
    fullWidth
    helperText={formik.touched[fieldName] && formik.errors[fieldName]}
    label={label}
    name={fieldName}
    onBlur={formik.handleBlur}
    onChange={formik.handleChange}
    type={type}
    value={formik.values[fieldName]}
    size='small'
    autoComplete='off'
    autoFocus
  />
)

interface BooleanFieldProps {
  formik: any,
  fieldName: string
  label: string
  t?: any
}
const FormikBooleanField: React.FC<BooleanFieldProps> = ({ formik, fieldName, t }) => {
  if (!formik.values[fieldName]) formik.values[fieldName] = 'false'

  return (
    <RadioGroup name={fieldName} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values[fieldName]}>
      <FormControlLabel value={true} control={<Radio />} label={t('common.yes')} />
      <FormControlLabel value={false} control={<Radio />} label={t('common.no')} />
    </RadioGroup>
  )
}

interface SelectFieldProps extends TextFieldProps {
  selectorValues: SelectorValue[]
}
export interface SelectorValue {
  id: string,
  label: string
}
const FormikSelectField: React.FC<SelectFieldProps> = ({ formik, fieldName, label, selectorValues }) => (
  <Select
    label={label}
    name={fieldName}
    value={formik.values[fieldName]}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    fullWidth
    size='small'
  >
    {selectorValues?.map((selectorValue: SelectorValue) => (
      <MenuItem key={selectorValue.id} value={selectorValue.id}>{selectorValue.label}</MenuItem>
    ))}
  </Select>
)

interface DateFieldProps extends TextFieldProps {
}
const FormikDateField: React.FC<DateFieldProps> = ({ formik, fieldName, label }) => (
  <MyDateTimePicker formik={formik} label={label} fieldName={fieldName}/>
)

interface FilterFieldDialogProps {
  open: boolean
  handleClose: () => void
  title: string
  formik: any,
  fieldName: string
  label: string
  buttonText: string
  type: 'text' | 'number' | 'date' | 'boolean' | 'select' | 'multi-select'
  selectorValues?: SelectorValue[]
}

const FilterFieldDialog: React.FC<FilterFieldDialogProps> = ({ open, handleClose, title, formik, fieldName, label, buttonText, type, selectorValues }) => {
  const { t } = useTranslation()

  const fieldComponents: { [key: string]: any | undefined } = {
    'text': <FormikTextAndNumberField formik={formik} fieldName={fieldName} label={label} type='text' />,
    'number': <FormikTextAndNumberField formik={formik} fieldName={fieldName} label={label} type='number' />,
    'date': <FormikDateField formik={formik} fieldName={fieldName} label={label} />,
    'boolean': <FormikBooleanField formik={formik} fieldName={fieldName} label={label} t={t} />,
    'select': <FormikSelectField formik={formik} fieldName={fieldName} label={label} selectorValues={selectorValues!} />,
  }

  return (
    <CustomDialog maxWidth='xs' fullWidth open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <form noValidate onSubmit={formik.handleSubmit}>
        <DialogContent>
          {fieldComponents[type]}
        </DialogContent>
        <DialogActions>
          <Button type='submit' variant='contained' fullWidth disabled={formik.values[fieldName] == '' || !formik.isValid}>
            {buttonText}
          </Button>
        </DialogActions>
      </form>
    </CustomDialog>
  )
}

export default FilterFieldDialog