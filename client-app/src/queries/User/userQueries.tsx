import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import axios from 'axios'
import { type StudentTypes, type UserTypes } from './studentTypes'

const getAccount = async (): Promise<StudentTypes> =>
  await axios
    .get('/api/account')
    .then(({ data }) => data)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getUserByLogin = async (login: string): Promise<UserTypes> =>
  await axios
    .get('/api/student')
    .then(({ data }) => data)

export const useAccount = (): UseQueryResult<StudentTypes> => {
  return useQuery<StudentTypes>(['studentByLogin'], async () => await getAccount())
}
