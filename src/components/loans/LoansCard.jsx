import styled from 'styled-components'
import { patchLoan } from '../../api/LoansApi'
import { useState } from 'react'

const Card = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 15px;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 50%;
  @media (max-width: 600px) {
    width: 90%;
`

const Img = styled.img`
  width: 100px;
  height: 140px;
  object-fit: cover;
  border-radius: 4px;
`

const Info = styled.div`
  flex: 1;
`

const Title = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`

const Button = styled.button`
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #6c63ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

export default function LoanCard({ loan }) {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(loan.status)

  const handleReturn = async () => {
    setLoading(true)
    try {
      await patchLoan(loan._id, {})
      setStatus('returned')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <Img src={loan.book.covers} alt={loan.book.title} />
      <Info>
        <Title>{loan.book.title}</Title>
        <p>Autor: {loan.book.author}</p>
        <p>Usuario: {loan.user.userName}</p>
        <p>Fecha préstamo: {new Date(loan.loanDate).toLocaleDateString()}</p>
        <p>Estado: {status}</p>
        {status === 'ongoing' && (
          <Button onClick={handleReturn} disabled={loading}>
            {loading ? 'Procesando...' : 'Devolver'}
          </Button>
        )}
      </Info>
    </Card>
  )
}
