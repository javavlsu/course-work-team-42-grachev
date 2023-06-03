import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import axios from 'axios'
import { type ServicesInfoTypes } from './servicesInfoTypes'

const getServicesInfo = async (): Promise<ServicesInfoTypes> =>
  await axios
    .get('api/servicesinfo')
    .then(({ data }) => {
      data.openDoorsDate = new Date(data.openDoorsDate)
      return data
    })

export const useServicesInfo = (): UseQueryResult<ServicesInfoTypes> => {
  return useQuery<ServicesInfoTypes>(['servicesInfo'], getServicesInfo, {
    staleTime: Infinity
  })
}
