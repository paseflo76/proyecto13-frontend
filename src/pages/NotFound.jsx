import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
`

export default function NotFound() {
  return (
    <Container>
      <h1>404</h1>
      <p>Página no encontrada</p>
      <Link to='/'>Volver al inicio</Link>
    </Container>
  )
}
