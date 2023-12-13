import { Medicine } from '@/interfaces/backend/medicine'
import { getEntity, postEntity, putEntity } from '../api.service'

export const getMedicines = async (): Promise<Medicine[]> => {
  return await getEntity<Medicine[]>('admin/medicines')
}

export const postMedicine = async ({ name }: Medicine): Promise<string> => {
  return await postEntity<string>('medicines', { name })
}

export const putMedicine = async ({ id, name }: Medicine): Promise<void> => {
  return await putEntity<void>(`medicines/${id}`, { name })
}
