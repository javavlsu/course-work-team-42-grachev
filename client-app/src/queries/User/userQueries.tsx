import {useQuery, UseQueryResult} from "@tanstack/react-query";
import axios from "axios";
import {StudentTypes, UserTypes} from "./studentTypes";

const getStudentByLogin = (login: string): Promise<StudentTypes> =>
  axios
    .get(`/api/user/getStudentByLogin/${login}`)
    .then(({data}) => data);

const getUserByLogin = (login: string): Promise<UserTypes> =>
  axios
    .get(`/api/user/${login}`)
    .then(({data}) => data);

export const useStudentByLogin = (login: string): UseQueryResult<StudentTypes> => {
  return useQuery<StudentTypes>(["studentByLogin", login], () => getStudentByLogin(login));
}