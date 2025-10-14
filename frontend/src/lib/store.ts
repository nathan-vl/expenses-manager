import { Transaction } from "@/shared/types/transaction";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TransactionStore {
  transactions: Transaction[];
  isDialogOpen: boolean;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set) => ({
      transactions: [],
      isDialogOpen: false,
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            ...state.transactions,
            { ...transaction, id: crypto.randomUUID() },
          ],
        })),
      openDialog: () => set({ isDialogOpen: true }),
      closeDialog: () => set({ isDialogOpen: false }),
    }),
    {
      name: "expense-manager-storage",
    }
  )
);
