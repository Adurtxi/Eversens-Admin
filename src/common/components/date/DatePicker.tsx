
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers'

export default function MyDateTimePicker() {
  return <DateTimePicker
    slotProps={{ textField: { size: 'small' } }}
    label="Fecha inicio"
    viewRenderers={{
      hours: renderTimeViewClock,
      minutes: renderTimeViewClock,
      seconds: renderTimeViewClock,
    }}
  />
}