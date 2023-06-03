import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import axios from 'axios'
import { type AccountTypes } from './accountsTypes'

const getAccounts = async (): Promise<AccountTypes> =>
  await axios
    .get('api/account')
    .then(({ data }) => data)

export const useAccounts = (): UseQueryResult<AccountTypes> => {
  return useQuery<AccountTypes>(['users'], getAccounts)
}
