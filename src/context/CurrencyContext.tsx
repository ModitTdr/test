import { createContext, useContext, useState } from "react";

export type Currency = 'usd' | 'eur' | 'btc';
type CurrencyContextType = {
  currency: Currency
  changeCurrency: (currency: Currency) => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const CurrencyContext = createContext<CurrencyContextType | null>(null);

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>(localStorage.getItem('currency') as Currency || 'usd');

  const changeCurrency = (currency: Currency) => {
    setCurrency(currency);
    localStorage.setItem('currency', currency);
  }

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
}