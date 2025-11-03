import styled from 'styled-components'

const Container = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 76svh;
`

const Title = styled.h1`
  font-size: 40px;
  color: #04253bff;
  margin-bottom: 10px;
  text-shadow: 1px 3px 0 #969696, 1px 13px 5px #aba8a8;
  @media (max-width: 760px) {
    font-size: 24px;
`

const Bienvenida = styled.p`
  font-size: 25px;
  color: #04253bff;
  margin-bottom: 20px;
  @media (max-width: 760px) {
    font-size: 16px;
  }
`
const Img = styled.img`
  max-width: 400px;
  border-radius: 10px;
  @media (max-width: 760px) {
    max-width: 300px;
  }
`

export default function Home() {
  return (
    <Container>
      <Title>Bienvenido a El Estante Rebelde</Title>
      <Bienvenida>Explora los libros y gestiona tus préstamos.</Bienvenida>
      <Img src='/assets/estante.png' alt='Library' />
    </Container>
  )
}
