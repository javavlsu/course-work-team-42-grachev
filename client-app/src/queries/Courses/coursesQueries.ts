import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import {CourseInProfileTypes, CoursesTypes, TestTypes} from "./coursesTypes";


const getCourses = (): Promise<CoursesTypes> =>
  axios
    .get(`/api/courses`)
    .then(({ data }) => data);

export const useCourses = (): UseQueryResult<CoursesTypes> => {
  return useQuery<CoursesTypes>(["courses"], getCourses)
}



const getCoursesToProfilePage = (): Promise<CourseInProfileTypes[]> =>
  axios
    .get(`/api/courses/toprofilepage`)
    .then(({ data }) => data);

export const useCoursesInProfile = (): UseQueryResult<CourseInProfileTypes[]> => {
  return useQuery<CourseInProfileTypes[]>(["coursesInProfile"], getCoursesToProfilePage)
}




const getCoursesById = (id:string): Promise<CoursesTypes> =>
  axios
    .get(`/api/courses/${id}`)
    .then(({ data }) => data);

export const useCoursesById = (id:string): UseQueryResult<CoursesTypes> => {
  return useQuery<CoursesTypes>(["coursesById",id], ()=>getCoursesById(id))
}



const getTestById = (id:string): Promise<TestTypes> =>
  axios
    .get(`/api/courses/testbyid/${id}`)
    .then(({ data }) => data);

export const useTestById = (id:string): UseQueryResult<TestTypes> => {
  return useQuery<TestTypes>(["testById",id], ()=>getTestById(id))
}