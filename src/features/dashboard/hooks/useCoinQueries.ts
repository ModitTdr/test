import { CurrencyContext } from "@/context/CurrencyContext";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { getCoinsList, searchCoins } from "../services/coinsServices";

export const useCoinQuery = () => {
  const { currency } = useContext(CurrencyContext);

  const query = useQuery({
    queryKey: ['coins', currency],
    queryFn: () => {
      const data = getCoinsList(currency);
      return data;
    },
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    refetchInterval: 15000,
    staleTime: 15000,
  })

  return {
    ...query,
    currency
  }
};

export const useSearchCoin = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => searchCoins(query),
    enabled: query.trim().length > 0,
    staleTime: 5 * 60 * 1000,
  })
}