import { useCoinQuery } from "../hooks/useCoinQueries"
import { Table, TableBody, TableEmptyState, TableHead, TableHeader, TableRow } from "@/components/atom/Table";
import CoinRow from "../components/table/CoinRow";
import CoinCard from "../components/CoinCard";
import { useCoinStore } from "@/store/coinStore";

const Dashboard = () => {
  const { isLoading, currency } = useCoinQuery();
  const data = useCoinStore(state => state.coinIds);
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
            absolute top-0 left-1/2 -translate-x-1/2 lg:-translate-y-20
          "
        >
          Dashboard
        </h1>
        <div className="flex justify-evenly items-center gap-4 pt-35 flex-wrap">
          {topData &&
            topData.map((coinId: string, index) => {
              return (
                <CoinCard
                  key={coinId}
                  coinId={coinId}
                  index={index}
                  currencyType={currency}
                />
              )
            })
          }
        </div>
      </div>

      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Index</TableHead>
              <TableHead>Coin</TableHead>
              <TableHead>Valuation</TableHead>
              <TableHead>Total Volume</TableHead>
              <TableHead className="text-right">Market Change (24h)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data ? (
              data.map((coinId: string, index: number) => {
                return (
                  <CoinRow
                    key={coinId}
                    coinId={coinId}
                    index={index}
                    currency={currency}
                  />
                )
              })
            ) : (
              <TableEmptyState colSpan={5} isLoading={isLoading} />
            )}
          </TableBody>
        </Table>
      </div>
    </section >
  )
}

export default Dashboard