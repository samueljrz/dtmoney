import Modal from 'react-modal'
import entrada from '../../assets/income.svg'
import saida from '../../assets/outcome.svg'
import fechar from '../../assets/close.svg'
import { Container, SelectionContainer } from './styles'
import { FormEvent, useState } from 'react'

import { useTransactions } from '../../hooks/useTransactions'

interface TransactionModalProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
}

interface FormData {
  title: string;
  amount: number | undefined;
  category: string;
}

enum Type {
  neutral,
  input,
  output
}

export function TransactionModal({isModalOpen, onCloseModal}: TransactionModalProps) { 
  const { createTransaction } = useTransactions()
  const [formData, setFormData] = useState<FormData>({
    title: '',
    amount: 0,
    category: ''
  })
  const [onEntradaSelected, setOnEntradaSelected] = useState<Type>(Type.neutral)
  
  function handleEntradaChange() {
    onEntradaSelected !== Type.input ? setOnEntradaSelected(Type.input) : setOnEntradaSelected(Type.neutral)
  }

  function handleSaidaChange() {
    onEntradaSelected !== Type.output ? setOnEntradaSelected(Type.output) : setOnEntradaSelected(Type.neutral)
  }

  async function handleCreateTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      ...formData,
      type: onEntradaSelected === Type.input ? 'deposit' : 'withdraw',
    })
    setFormData({
      title: '',
      amount: 0,
      category: ''
    })
    setOnEntradaSelected(Type.neutral)
    onCloseModal();
  }

  return (
    <Modal 
      isOpen={isModalOpen} 
      onRequestClose={onCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button 
        type="button" 
        onClick={onCloseModal} 
        className="react-modal-button"
      >
        <img src={fechar} alt="Fechar"/>
      </button>
      <Container onSubmit={handleCreateTransaction}>
        <h2>Cadastrar transação</h2>

        <input placeholder="Título" value={formData.title} onChange={event => setFormData({
          ...formData,
          title: event.target.value
        })}/>
        <input 
          type="number" 
          placeholder="Valor" 
          value={formData.amount || ""}
          onChange={event => setFormData({
            ...formData,
            amount: parseInt(event.target.value) || 0
          })}
        />
        <SelectionContainer>
          <button 
            className={onEntradaSelected === Type.input ? "inputSelected" : ""} 
            type="button" 
            onClick={handleEntradaChange}
          >
            <img src={entrada} alt="Entrada"/>
            <span>Entrada</span>
          </button>
          <button 
            className={onEntradaSelected === Type.output ? "outputSelected" : ""} 
            type="button" 
            onClick={handleSaidaChange}
          >
            <img src={saida} alt="Saida"/>
            <span>Saída</span>
          </button>
        </SelectionContainer>
        <input 
          placeholder="Categoria" 
          value={formData.category}
          onChange={event => setFormData({
            ...formData,
            category: event.target.value
          })}  
        />
        <button disabled={!onEntradaSelected} type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  )
}