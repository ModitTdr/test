import Button from "@/components/atom/Button"
import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader, ModalTitle } from "@/components/atom/Modal"
import { X } from "lucide-react"
import { removePortfolio } from "../../services/portfolioService"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import toast from "react-hot-toast"
import Loader from "@/components/atom/Loader"

interface DeleteCoinModalProps {
  delState: {
    open: boolean,
    id: string,
    coinName: string | null,
  }
  onClose: () => void
}

const DeleteCoinModal = ({
  delState,
  onClose
}: DeleteCoinModalProps) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async (coinId: string) => {
    setLoading(true);
    try {
      await removePortfolio(coinId);
      toast.success(`${delState.coinName} removed from portfolio`);
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      onClose();
    } catch (error) {
      toast.error("Failed to remove coin");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal>
      <ModalHeader>
        <ModalTitle>Delete Coin</ModalTitle>
        <ModalClose onClose={onClose}>
          <X size={20} />
        </ModalClose>
      </ModalHeader>
      <ModalBody>
        <p className="text-lg">Are you sure you want to delete <span className="font-bold text-primary">{delState.coinName}</span> from your portfolio?</p>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
        <Button variant="danger" onClick={() => handleDelete(delState.id)} disabled={loading}>
          {loading ? <Loader>Deleting</Loader> : "Delete"}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteCoinModal