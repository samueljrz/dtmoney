import React from 'react'
import entrada from '../../assets/income.svg'
import saida from '../../assets/outcome.svg'
import total from '../../assets/total.svg'
import { useTransactions } from '../../hooks/useTransactions';

import { Container } from "./styles";

export function Summary() {
  const { table } = useTransactions()
  console.log(table)

  const summary = table.reduce((acc, transaction) => {
    if(transaction.type === 'deposit') {
      acc.entrada += (transaction.amount || 0);
      acc.total += (transaction.amount || 0)
    }else {
      acc.saida += (transaction.amount || 0);
      acc.total -= (transaction.amount || 0);
    }
    return acc;
  }, {
    entrada: 0,
    saida: 0,
    total: 0
  }) 

  return (
    <Container>
      <div>
        <header>
          <p>Entrada</p>
          <img src={entrada} alt="Entradas"/>
        </header>
        <strong>
          {
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format((summary.entrada) as number)
          }
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={saida} alt="Saídas"/>
        </header>
        <strong>
          {
            '-'+new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format((summary.saida) as number)
          }
        </strong>
      </div>
      <div>
        <header>
          <p>Total</p>
          <img src={total} alt="Entradas"/>
        </header>
        <strong>
          {
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format((summary.total) as number)
          }
        </strong>
      </div>
    </Container>
  )
}