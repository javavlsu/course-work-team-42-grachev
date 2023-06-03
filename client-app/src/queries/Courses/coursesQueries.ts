import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import axios from 'axios'
import { type CourseInProfileTypes, type CoursesTypes, type TestTypes } from './coursesTypes'

const getCourses = async (): Promise<CoursesTypes> =>
  await axios
    .get('/api/courses')
    .then(({ data }) => data)

export const useCourses = (): UseQueryResult<CoursesTypes> => {
  return useQuery<CoursesTypes>(['courses'], getCourses)
}

const getCoursesToProfilePage = async (): Promise<CourseInProfileTypes[]> =>
  await axios
    .get('/api/courses/toprofilepage')
    .then(({ data }) => data)

export const useCoursesInProfile = (): UseQueryResult<CourseInProfileTypes[]> => {
  return useQuery<CourseInProfileTypes[]>(['coursesInProfile'], getCoursesToProfilePage)
}

const getCoursesById = async (id: string): Promise<CoursesTypes> =>
  await axios
    .get(`/api/courses/${id}`)
    .then(({ data }) => data)

export const useCoursesById = (id: string): UseQueryResult<CoursesTypes> => {
  return useQuery<CoursesTypes>(['coursesById', id], async () => await getCoursesById(id))
}

const getTestById = async (id: string): Promise<TestTypes> =>
  await axios
    .get(`/api/courses/test/${id}`)
    .then(({ data }) => data)

export const useTestById = (id: string): UseQueryResult<TestTypes> => {
  return useQuery<TestTypes>(['test', id], async () => await getTestById(id))
}
