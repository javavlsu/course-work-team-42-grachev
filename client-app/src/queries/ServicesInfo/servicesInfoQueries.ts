import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { ServicesInfoTypes } from "./servicesInfoTypes";


const getServicesInfo = (): Promise<ServicesInfoTypes> =>
    axios
        .get(`api/servicesinfo`)
        .then(({ data }) => {
            data.openDoorsDate = new Date(data.openDoorsDate);
            return data;
        });


export const useServicesInfo = (): UseQueryResult<ServicesInfoTypes> => {
    return useQuery<ServicesInfoTypes>(["servicesInfo"], getServicesInfo, {
        staleTime: Infinity,
    })
}


