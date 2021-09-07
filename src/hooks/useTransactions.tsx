import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';

interface TableContent {
  id: number;
  title: string;
  amount: number | undefined;
  type: string;
  category: string;
  createdAt: string;
}

type TableContentInput = Omit<TableContent, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextProps {
  table: TableContent[];
  createTransaction: (transaction: TableContentInput) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextProps>({} as TransactionsContextProps);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [table, setTable] = useState<TableContent[]>([])
  
  useEffect(() => {
    api.get('/transactions')
    .then(response => setTable(response.data.transactions))
  }, [])

  async function createTransaction(transactionInput: TableContentInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    })
    
    const { transactions } = response.data
    
    setTable([
      ...table,
      transactions
    ])
  }

  return (
    <TransactionsContext.Provider value={{table, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)
  return context
}