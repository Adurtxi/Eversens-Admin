import { Medicine } from '@/interfaces/backend/medicine'
import { Pagination, getEntity, postEntity, putEntity, toQueryString } from '../api.service'


export const findAllMedicines = async (pageNumber: number, params: Record<string, any>): Promise<{ medicines: Medicine[], nextPage?: number }> => {
  if (pageNumber) params = { ...params, pageNumber }

  const { data, pagination } = await getEntity<{ data: Medicine[], pagination: Pagination }>('admin/medicines' + toQueryString(params))

  return {
    medicines: data,
    nextPage: pagination.CurrentPage < pagination.TotalPageCount ? pagination.CurrentPage + 1 : undefined,
  }
}

export const postMedicine = async ({ name }: Medicine): Promise<string> => {
  return await postEntity<string>('medicines', { name })
}

export const putMedicine = async ({ id, name }: Medicine): Promise<void> => {
  return await putEntity<void>(`medicines/${id}`, { name })
}
