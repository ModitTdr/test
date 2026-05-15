import { useCoinQuery } from "../hooks/useCoinQuery"
import { Table, TableBody, TableEmptyState, TableHead, TableHeader, TableRow } from "@/components/atom/Table";
import CoinRow from "../components/table/CoinRow";
import type { CoinResponseType } from "../types/coinResponseType";
import CoinCard from "../components/CoinCard";

const Dashboard = () => {
  const { data, isLoading, currency } = useCoinQuery();
  const topData = data?.slice(0, 3);

  return (
    <section className="space-y-10 overflow-hidden">
      <div className="relative text-center">
        <div className="bg-radial-[at_top] from-primary/60 to-transparent absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[70vh] blur-[99px]" />
        <h1
          className="
            text-[17vw] font-semibold font-sora
            bg-linear-to-b from-foreground from-25% via-foreground/5 via-60% to-background
            bg-clip-text bg-transparent text-transparent
            absolute top-0 left-1/2 -translate-x-1/2 -translate-y-20
          "
        >
          Dashboard
        </h1>
        <div className="flex justify-evenly items-center gap-4 pt-35">
          {topData &&
            topData.map((coin, index) => (
              <CoinCard
                key={index}
                data={coin}
                index={index}
                currencyType={currency}
              />
            ))
          }
        </div>
      </div>

      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Index</TableHead>
              <TableHead>Coin</TableHead>
              <TableHead className="text-right">Valuation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data ? (
              data.map((coin: CoinResponseType, index: number) => {
                return (
                  <CoinRow
                    key={index}
                    data={coin}
                    index={index}
                    currency={currency}
                  />
                )
              })
            ) : (
              <TableEmptyState colSpan={3} isLoading={isLoading} />
            )}
          </TableBody>
        </Table>
      </div>
    </section >
  )
}

export default Dashboard