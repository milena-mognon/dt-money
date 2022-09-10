import { createContext, ReactNode, useEffect, useState } from 'react';

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
}

interface TransactionsProviderProds {
  children: ReactNode; // ReactNode = qualquer elemento valido do react
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProds) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions() {
    const response = await fetch(`http://localhost:3333/transactions`);
    const data = await response.json();
    setTransactions(data);
  }
  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
