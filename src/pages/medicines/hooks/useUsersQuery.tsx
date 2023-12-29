import { useQuery } from '@tanstack/react-query'

import { User } from '@/interfaces/backend/user'
import { findAllProfessionalUsers } from '@/services/user/user.service'

interface UseUsersQuery {
  users: User[]
  isUsersLoading: boolean
  usersError: Error | null
}

export const useUsersQuery = (): UseUsersQuery => {
  const { data: users, isLoading: isUsersLoading, error: usersError } = useQuery<User[], Error>(
    {
      queryKey: ['getUsers'],
      queryFn: () => findAllProfessionalUsers({}),
      refetchOnWindowFocus: false,
    }
  )
  
  return { users: users ?? [], isUsersLoading, usersError }
}