import { User } from '@/interfaces/backend/user'
import { getEntity, postEntity, toQueryString } from '../api.service'

export const postLogin = async (
  username: string,
  password: string
): Promise<{ token: string; id: string }> => {
  return await postEntity<{ token: string; id: string }>(`users/login`, {
    username,
    password,
  })
}

export const findAllUsers = async (params: Record<string, any>): Promise<User[]> => {
  return await getEntity(`users/professionals/` + toQueryString(params))
}

export const findUserById = async (id: string): Promise<User> => {
  return await getEntity(`users/${id}`)
}
