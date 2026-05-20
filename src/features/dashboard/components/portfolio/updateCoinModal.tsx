import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import Button from "@/components/atom/Button";
import Input from "@/components/atom/Input";

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalClose,
} from "@/components/atom/Modal";
import { X } from "lucide-react";
import CoinData from "../table/CoinData";
import type { PortfolioItem } from "../../types/coinPortfolio";
import { updatePortfolioCoin } from "../../services/portfolioService";

interface Props {
  coin: PortfolioItem;
  onClose: () => void;
}

const UpdateCoinModal = ({ coin, onClose }: Props) => {
  const [amount, setAmount] = useState(String(coin.amount));
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const handleUpdate = async () => {
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      toast.error("Enter valid amount");
      return;
    }

    try {
      setLoading(true);
      await updatePortfolioCoin(coin.coinId, parsedAmount);
      toast.success("Portfolio updated");
      queryClient.invalidateQueries({
        queryKey: ["portfolio"],
      });
      onClose();
    } catch (error) {
      toast.error("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <ModalHeader>
        <ModalTitle>Update Holdings</ModalTitle>
        <ModalClose onClose={onClose}>
          <X size={20} />
        </ModalClose>
      </ModalHeader>

      <ModalBody>
        <div className="space-y-6">
          <div className="rounded bg-subtle p-4">
            <CoinData
              image={coin.image}
              name={coin.name}
              symbol={coin.symbol}
            />
          </div>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </ModalBody>

      <ModalFooter>
        <Button
          variant="primary"
          onClick={handleUpdate}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateCoinModal;