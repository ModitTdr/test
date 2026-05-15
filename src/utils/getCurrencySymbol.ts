export const getCurrencySymbol = (currency: string) => {
  const symbols = {
    usd: '$',
    eur: '€',
    btc: '₿',
  };

  return symbols[currency?.toLowerCase()] || '';
};