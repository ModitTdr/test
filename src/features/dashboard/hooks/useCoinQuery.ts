import { CurrencyContext } from "@/context/CurrencyContext";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { getCoinsList } from "../services/coinsServices";

export const useCoinQuery = () => {
  const { currency } = useContext(CurrencyContext);

  const query = useQuery({
    queryKey: ['coins', currency],
    queryFn: async () => {
      const data = await getCoinsList(currency);
      return data;
    },
    placeholderData: keepPreviousData,
    refetchInterval: 10000,
  })

  return {
    ...query,
    currency
  }
};