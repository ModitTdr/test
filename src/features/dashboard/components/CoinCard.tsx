import { getCurrencySymbol } from '@/utils/getCurrencySymbol';
import Badge from '@/components/atom/Badge';

import { Card } from '@/components/atom/Card'; import { useCoinStore } from '@/store/coinStore';
interface CoinCardProps {
  coinId: string;
  index: number;
  currencyType: string;
}
const CoinCard = ({ coinId, index, currencyType }: CoinCardProps) => {
  const data = useCoinStore(state => state.coinsObj[coinId]);
  return (
    <Card className=' w-[440px] h-[240px]'>
      <div className="absolute -right-10 -bottom-10 w-60 opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-50 transition-all duration-700 rotate-12 group-hover:rotate-0">
        <img src={data?.image} alt="" className="w-full h-full object-contain" />
      </div>

      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <h2 className="text-3xl font-sora font-bold tracking-tight text-white text-start flex items-end gap-3">
            {data?.name}
            <span className="text-xs uppercase tracking-wide text-primary font-semibold mb-1 text-start">
              #{index + 1}
            </span>
          </h2>
          <img src={data?.image} alt={data?.name} className="w-12 h-12 rounded-full" />
        </div>

        <div className="flex flex-col">
          <span className="text-4xl font-light tracking-tighter tabular-nums text-start">
            {getCurrencySymbol(currencyType)}
            {data?.current_price.toLocaleString()}
          </span>
          <div className={`text-sm mt-1 flex items-center gap-2 ${data?.price_change_percentage_24h < 0 ? "text-warning" : "text-success"}`}>
            <Badge variant={data?.price_change_percentage_24h < 0 ? "danger" : "success"}>
              {data?.price_change_percentage_24h > 0 ? '+' : ''}
              {data?.price_change_percentage_24h?.toFixed(2)}%
            </Badge>
            <span className="opacity-40 text-[10px] uppercase tracking-widest">24H Change</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default CoinCard