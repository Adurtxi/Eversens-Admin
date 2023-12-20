import { useInfiniteQuery } from '@tanstack/react-query'

import { Medicine } from '@/interfaces/backend/medicine'
import { findAllMedicines } from '@/services/medicine/medicine.service'

interface UseMedicinesQuery {
  medicines: Medicine[]
  isMedicinesLoading: boolean
  medicinesError: Error | null
  fetchNextPage: () => void
  hasNextPage: boolean
}

export const useMedicinesQuery = (searchParams: Record<string, any> | any): UseMedicinesQuery => {
  const {
    data, isLoading: isMedicinesLoading, error: medicinesError, fetchNextPage, hasNextPage,
  } = useInfiniteQuery<{ medicines: Medicine[], nextPage?: number }>(
    {
      queryKey: ['getMedicines', searchParams],
      queryFn: ({ pageParam }: any) => findAllMedicines(pageParam, searchParams),
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: undefined,
    }
  )

  const medicines = data?.pages.flatMap((page) => page.medicines) ?? []
  
  return { medicines, isMedicinesLoading, medicinesError, fetchNextPage, hasNextPage }
}