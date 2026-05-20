import Button from "@/components/atom/Button"
import { Pencil, Plus, Trash } from "lucide-react"
import { useState } from "react"
import { AddCoinModal } from "../components/portfolio/addCoinModal"
import { useQuery } from "@tanstack/react-query"
import { getPortfolio } from "../services/portfolioService"
import CoinData from "../components/table/CoinData"
import Loader from "@/components/atom/Loader"
import { usePortfolioValue } from "../hooks/usePortfolioValues"
import { getCurrencySymbol } from "@/utils/getCurrencySymbol"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/atom/Table"
import DeleteCoinModal from "../components/portfolio/deleteCoinModal"
import UpdateCoinModal from "../components/portfolio/updateCoinModal"
import type { PortfolioItem } from "../types/coinPortfolio"
import { useAuth } from "@/hooks/useAuth"


const Portfolio = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState({
    open: false,
    coin: null,
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState({
    open: false,
    id: null,
    coinName: null,
  });

  const { user } = useAuth();
  const { data: portfolio, isLoading } = useQuery({
    queryKey: ['portfolio', user?.uid],
    queryFn: getPortfolio,
    enabled: !!user,
  })

  const { totalValue, prices, currency } = usePortfolioValue(portfolio);

  const handleDelete = (id: string, coinName: string) => {
    setIsDeleteModalOpen({
      open: true,
      id,
      coinName
    })
  }
  const handleEdit = (coin: PortfolioItem) => {
    setIsEditModalOpen({
      open: true,
      coin,
    });
  };

  return (
    <section className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-foreground-muted">Your Balance:</p>
          <h1 className="text-6xl font-sora">
            {getCurrencySymbol(currency)}{totalValue.toLocaleString()}
          </h1>
        </div>
        <Button
          variant="primary"
          className="w-fit font-medium gap-1"
          onClick={() => setIsModalOpen(true)}
        >
          Add Coin <Plus size={18} />
        </Button>
      </div>

      <div className="mt-16 w-full flex flex-col items-center justify-start rounded-md bg-subtle/50 min-h-[240px] p-6 px-8">
        {
          isLoading ? (
            <Loader>Loading...</Loader>
          ) : portfolio?.length === 0 ? (
            <p className="text-foreground-muted text-lg">Your portfolio is currently empty</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Coin</TableHead>
                  <TableHead className="text-right">Holdings</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolio?.map((coin) => {
                  const currentPrice = prices?.[coin.coinId]?.[currency.toLowerCase()] || 0;
                  const holdingValue = currentPrice * coin.amount;

                  return (
                    <TableRow key={coin.coinId}>
                      <TableCell>
                        <CoinData image={coin.image} name={coin.name} symbol={coin.symbol} />
                      </TableCell>
                      <TableCell className="text-right">
                        <p className="font-semibold">{coin.amount} {coin.symbol.toUpperCase()}</p>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center gap-3">
                          <p className="font-medium">
                            {getCurrencySymbol(currency)}{holdingValue.toLocaleString()}
                          </p>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="cursor-pointer text-blue-500"
                              onClick={() => handleEdit(coin)}
                            >
                              <Pencil size={18} />
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="cursor-pointer text-red-500"
                              onClick={() => handleDelete(coin.id, coin.name)}
                            >
                              <Trash size={18} />
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )
        }
      </div>

      {isModalOpen && (
        <AddCoinModal onClose={() => setIsModalOpen(false)} />
      )}
      {
        isDeleteModalOpen.open &&
        isDeleteModalOpen.coinName &&
        isDeleteModalOpen.id && (
          <DeleteCoinModal
            delState={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen({ open: false, id: null, coinName: null })}
          />
        )
      }
      {
        isEditModalOpen.open &&
        isEditModalOpen.coin && (
          <UpdateCoinModal
            coin={isEditModalOpen.coin}
            onClose={() =>
              setIsEditModalOpen({
                open: false,
                coin: null,
              })
            }
          />
        )
      }

    </section>
  )
}

export default Portfolio