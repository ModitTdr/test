import type { CoinResponseType } from '@/features/dashboard/types/coinResponseType'
import { create } from 'zustand'

interface State {
  coinsObj: Record<string, CoinResponseType>
  coinIds: string[];
  setCoins: (coints: CoinResponseType[]) => void;
}

export const useCoinStore = create<State>(
  (set) => ({
    coinsObj: {},
    coinIds: [],

    setCoins: (coins) => {
      const newCoinData = coins.map(coin => [coin.id, coin]);
      const newObj = Object.fromEntries(newCoinData);

      set({
        coinsObj: newObj,
        coinIds: coins.map(c => c.id)
      });
    }

  })
);