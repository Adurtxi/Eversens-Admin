import { User } from '@/interfaces/backend/user'
import { Pagination, getEntity, postEntity, putEntity, toQueryString } from '../api.service'

export const postLogin = async (
  username: string,
  password: string
): Promise<{ token: string; id: string }> => {
  return await postEntity<{ token: string; id: string }>(`users/login`, {
    username,
    password,
  })
}

export const findAllProfessionalUsers = async (params: Record<string, any>): Promise<User[]> => {
  return await getEntity(`users/professionals/` + toQueryString(params))
}

export const findAllUsers = async (pageNumber: number, params: Record<string, any>): Promise<{ users: User[], nextPage?: number }> => {
  if (pageNumber) params = { ...params, pageNumber }

  const { data, pagination } = await getEntity<{ data: User[], pagination: Pagination }>('admin/users' + toQueryString(params))

  return {
    users: data,
    nextPage: pagination.CurrentPage < pagination.TotalPageCount ? pagination.CurrentPage + 1 : undefined,
  }
}

export const findUserById = async (id: string): Promise<User> => {
  return await getEntity(`users/${id}`)
}


export const postUser = async ({ username }: User): Promise<string> => {
  return await postEntity<string>('users', { username })
}

export const putUser = async ({ id, username }: User): Promise<void> => {
  return await putEntity<void>(`users/${id}`, { username })
}
