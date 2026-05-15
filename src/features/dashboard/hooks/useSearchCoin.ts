import { useQuery } from "@tanstack/react-query"
import { searchCoins } from "../services/coinsServices"

export const useSearchCoin = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      const data = await searchCoins(query);
      return data;
    },
    enabled: !!query,
  })
}