import { useTransactions } from "../../hooks/useTransactions"

import { Container } from "./styles"

export function TransactionsTable() {
  const { table } = useTransactions()
  
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categorias</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {table.map(data => {
            return (
              <tr key={`${data.id}`}>
                <td>{data.title}</td>
                <td className={data.type}>{data.type === 'deposit' ? 
                  new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                  }).format((data.amount) as number) : 
                  '-'+new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format((data.amount) as number)}
                </td>
                <td>{data.category}</td>
                <td>{new Intl.DateTimeFormat('pt-BR', {}).format(
                  new Date(data.createdAt)
                )}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Container>
  )
}