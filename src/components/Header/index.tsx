import logo from '../../assets/logo.svg'

import { Container, Content } from './styles'

interface HeaderProps {
  onOpenModal: () => void;
}

export function Header({onOpenModal}: HeaderProps) {
  return (
      <Container>
        <Content>
          <img src={logo} alt="dt_money" />
          <button type="button" onClick={onOpenModal}>
            Nova transação
          </button>
        </Content>
      </Container>
  )
}