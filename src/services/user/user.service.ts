import { User } from '@/interfaces/backend/user'
import { getEntity, postEntity } from '../api.service'

export const postLogin = async (
  username: string,
  password: string
): Promise<{ token: string; id: string }> => {
  return await postEntity<{ token: string; id: string }>(`users/login`, {
    username,
    password,
  })
}

export const findUserById = async (id: string): Promise<User> => {
  return getEntity(`users/${id}`)
}
