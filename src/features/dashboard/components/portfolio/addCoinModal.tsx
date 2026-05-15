import { useState } from 'react'
import { X, ArrowLeft } from "lucide-react"
import Button from "@/components/atom/Button"
import Input from "@/components/atom/Input"
import { useSearchCoin } from "../../hooks/useSearchCoin"
import { useDebounce } from "@/hooks/useDebounce"
import type { CoinSearchResponse } from "../../types/coinResponseType"
import { addCoinToPortfolio } from "../../services/portfolioService"
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import CoinData from '../table/CoinData'
import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader, ModalTitle } from '@/components/atom/Modal'
import Loader from '@/components/atom/Loader'

interface AddCoinModalProps {
  onClose: () => void;
}

export const AddCoinModal = ({ onClose }: AddCoinModalProps) => {
  const [search, setSearch] = useState('');
  const [selectedCoin, setSelectedCoin] = useState<CoinSearchResponse | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading: isSearching } = useSearchCoin(debouncedSearch);
  const queryClient = useQueryClient();

  const handleSelectCoin = (coin: CoinSearchResponse) => {
    setSelectedCoin(coin);
    setSearch('');
  };
  const handleBack = () => {
    setSelectedCoin(null);
    setAmount('');
  };

  const handleAddCoin = async () => {
    if (!selectedCoin || !amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      await addCoinToPortfolio(selectedCoin, parseFloat(amount));
      toast.success(`${selectedCoin.name} added to your portfolio`);
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      onClose();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to add coin";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <ModalHeader className="bg-neutral-900/50">
        <div className="flex items-center gap-3">
          {selectedCoin && (
            <Button
              onClick={handleBack}
              variant="ghost"
              size="icon"
            >
              <ArrowLeft size={18} />
            </Button>
          )}

          <ModalTitle>Add Coin</ModalTitle>
        </div>

        <ModalClose onClose={onClose}>
          <X size={20} />
        </ModalClose>
      </ModalHeader>

      <ModalBody>
        {!selectedCoin ? (
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Search coin"
              className="border-strong"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />

            <div className="max-h-[250px] space-y-2 overflow-y-auto scrollbar-thumb-white/10">
              {isSearching && (
                <Loader>Searching coins...</Loader>
              )}

              {data?.coins?.map((coin: CoinSearchResponse) => (
                <Button
                  key={coin.id}
                  variant="outline"
                  className="flex justify-between bg-subtle py-8"
                  onClick={() => handleSelectCoin(coin)}
                >
                  <CoinData
                    image={coin.thumb}
                    name={coin.name}
                    symbol={coin.symbol}
                  />

                  <div className="text-right">
                    <span className="rounded bg-strong px-2 py-1 text-xs">
                      #{coin.market_cap_rank || "N/A"}
                    </span>
                  </div>
                </Button>
              ))}

              {!isSearching && data?.coins?.length === 0 && (
                <div className="py-10 text-center opacity-50">
                  <p>No coins found</p>
                </div>
              )}

              {!search && !isSearching && (
                <div className="py-10 text-center opacity-50">
                  <p>Start typing to find a coin</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded bg-subtle p-4">
              <CoinData
                image={selectedCoin.thumb}
                name={selectedCoin.name}
                symbol={selectedCoin.symbol}
              />
            </div>

            <div>
              <label
                htmlFor="amount"
                className="mb-2 block"
              >
                How much {selectedCoin.name} do you own?
              </label>

              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                autoFocus
              />
            </div>
          </div>
        )}
      </ModalBody>
      {
        selectedCoin && (
          <ModalFooter>
            <Button
              variant="primary"
              onClick={handleAddCoin}
              disabled={loading || !amount}
            >
              {loading ? (
                <Loader />
              ) : (
                "Add to Portfolio"
              )}
            </Button>
          </ModalFooter>
        )
      }
    </Modal>
  )
}
