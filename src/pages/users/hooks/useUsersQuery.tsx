import { useInfiniteQuery } from '@tanstack/react-query'

import { User } from '@/interfaces/backend/user'
import { findAllUsers } from '@/services/user/user.service'

interface UseUsersQuery {
  users: User[]
  isUsersLoading: boolean
  usersError: Error | null
  fetchNextPage: () => void
  hasNextPage: boolean
}

export const useUsersQuery = (searchParams: Record<string, any> | any): UseUsersQuery => {
  const {
    data, isLoading: isUsersLoading, error: usersError, fetchNextPage, hasNextPage,
  } = useInfiniteQuery<{ users: User[], nextPage?: number }>(
    {
      queryKey: ['getUsers', searchParams],
      queryFn: ({ pageParam }: any) => findAllUsers(pageParam, searchParams),
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 1,
    }
  )

  const users = data?.pages.flatMap((page) => page.users) ?? []
  
  return { users, isUsersLoading, usersError, fetchNextPage, hasNextPage }
}