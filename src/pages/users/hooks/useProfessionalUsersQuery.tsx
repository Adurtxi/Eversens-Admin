import { useQuery } from '@tanstack/react-query'

import { User } from '@/interfaces/backend/user'
import { findAllProfessionalUsers } from '@/services/user/user.service'

interface UseUsersQuery {
  professionalUsers: User[]
  isProfessionalUsersLoading: boolean
  professionalUsersError: Error | null
}

export const useProfessionalUsersQuery = (): UseUsersQuery => {
  const { data: users, isLoading: isProfessionalUsersLoading, error: professionalUsersError } = useQuery<User[], Error>(
    {
      queryKey: ['getUsers'],
      queryFn: () => findAllProfessionalUsers({}),
      refetchOnWindowFocus: false,
    }
  )
  
  return { professionalUsers: users ?? [], isProfessionalUsersLoading, professionalUsersError }
}