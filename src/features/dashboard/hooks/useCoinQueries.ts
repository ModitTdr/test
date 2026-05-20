import { CurrencyContext } from "@/context/CurrencyContext";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { getCoinsList, searchCoins } from "../services/coinsServices";
import { useCoinStore } from "@/store/coinStore";

export const useCoinQuery = () => {
  const { currency } = useContext(CurrencyContext);
  const setCoins = useCoinStore((state) => state.setCoins);

  const query = useQuery({
    queryKey: ['coins', currency],
    queryFn: async () => {
      const data = await getCoinsList(currency);
      setCoins(data)
      return data;
    },
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    refetchInterval: 15000,
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