import { TableCell, TableRow } from "@/components/atom/Table"
import CoinData from "./CoinData"
import { getCurrencySymbol } from "@/utils/getCurrencySymbol"
import type { CoinResponseType } from "../../types/coinResponseType";
import { memo } from "react";

interface CoinRowProps {
  data: CoinResponseType
  index: number;
  currency: string;
}
const CoinRow = ({ data, index, currency }: CoinRowProps) => {
  return (
    <TableRow key={index}>
      <TableCell>
        {String(index + 1).padStart(3, '0')}
      </TableCell>
      <TableCell>
        <CoinData image={data?.image} name={data?.name} symbol={data?.symbol} />
      </TableCell>
      <TableCell>
        <div className="text-lg tracking-tighter tabular-nums flex flex-col justify-end">
          <span>
            {getCurrencySymbol(currency)}
            {data?.current_price.toLocaleString('en-US')}
          </span>
          <span className={`text-sm  ${data?.price_change_percentage_24h?.toString().charAt(0) === "-" ? "text-warning" : "text-success"}`}>
            {data?.price_change_percentage_24h?.toFixed(5) != null
              ? `${data.price_change_percentage_24h.toFixed(5)}%`
              : "--"
            }
          </span>
        </div>
      </TableCell>
      <TableCell>
        <div className="text-lg tracking-tighter tabular-nums flex flex-col justify-end">
          {data?.total_volume}
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="text-lg tracking-tighter tabular-nums flex flex-col justify-end">
          {data?.market_cap_change_percentage_24h != null
            ? `${data.market_cap_change_percentage_24h.toFixed(3)}%`
            : "--"
          }
        </div>
      </TableCell>
    </TableRow>
  )
}

export default memo(CoinRow)