import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { TransactionModal } from './components/TransactionModal'

import Modal from 'react-modal'

import { GlobalStyle } from './styles/global'
import { useState } from 'react';
import { TransactionsProvider } from './hooks/useTransactions';

Modal.setAppElement('#root')

export function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }
 
  return (
    <TransactionsProvider>
      <Header onOpenModal={handleOpenModal} />
      <Dashboard />
      <TransactionModal isModalOpen={isModalOpen} onCloseModal={handleCloseModal} />
      <GlobalStyle />
    </TransactionsProvider>
  );
}
