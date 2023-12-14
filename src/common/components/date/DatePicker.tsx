
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers'

import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

interface MyDateTimePickerProps {
  formik: any,
  fieldName: string
  label: string
}

const MyDateTimePicker = ({ formik, fieldName, label }: MyDateTimePickerProps) => {
  const handleDateChange = (date: any) => {
    formik.setFieldValue(fieldName, date ? date.toISOString() : '')
  }
  const dateValue = formik.values[fieldName] ? dayjs(formik.values[fieldName]) : dayjs()

  return <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
    <DateTimePicker
      sx={{ width: '100%' }}
      slotProps={{ textField: { size: 'small' } }}
      label={label}
      onChange={handleDateChange}
      value={dateValue}
      format='DD/MM/YYYY HH:mm:ss'
      viewRenderers={{
        hours: renderTimeViewClock,
        minutes: renderTimeViewClock,
        seconds: renderTimeViewClock,
      }}
    /></LocalizationProvider>
}

export default MyDateTimePicker