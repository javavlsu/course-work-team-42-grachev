import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { AccountTypes } from "./accountsTypes";


const getAccounts = (): Promise<AccountTypes> =>
    axios
        .get(`api/account`)
        .then(({ data }) => data);

export const useAccounts = (): UseQueryResult<AccountTypes> => {
    return useQuery<AccountTypes>(["users"], getAccounts)
}
