import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCoinPrices } from "../services/coinsServices";
import { useCurrency } from "@/context/CurrencyContext";
import type { PortfolioItem } from "../types/coinPortfolio";

export const usePortfolioValue = (portfolio: PortfolioItem[] | undefined) => {
  const { currency } = useCurrency();

  const coinIds = portfolio?.map(item => item.coinId) || [];
  const query = useQuery({
    queryKey: ['portfolioPrices', coinIds, currency],
    queryFn: () => getCoinPrices(coinIds, currency),
    enabled: coinIds.length > 0,
    refetchOnWindowFocus: false,
    staleTime: 15000,
    refetchInterval: 15000,
    placeholderData: keepPreviousData,
  });


  const totalValue = portfolio?.reduce((acc, item) => {
    const price = query.data?.[item.coinId]?.[currency.toLowerCase()] || 0
    return acc + (price * item.amount)
  }, 0) || 0;

  return {
    ...query,
    totalValue,
    prices: query.data,
    currency
  };
};
