import dayjs from 'dayjs'

export const formatDateTime = (date: Date): string => {
  return dayjs(date).format('DD/MM/YYYY HH:mm')
}