import useUser from '@/hooks/useUser'
import { TransactionFilterType } from '@/models/transaction'
import { getTransactions } from '@/remote/transaction'
import { useInfiniteQuery } from 'react-query'

function useTransactions({
  suspense,
  filter,
}: { suspense?: boolean; filter?: TransactionFilterType } = {}) {
  const user = useUser()

  return useInfiniteQuery(
    ['transactions', user?.id, filter],
    ({ pageParam }) =>
      getTransactions({
        userId: user?.id as string,
        pageParam,
        filter,
      }),
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible
      },
      suspense,
    },
  )
}

export default useTransactions
