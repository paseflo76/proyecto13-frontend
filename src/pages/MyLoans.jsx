import styled from 'styled-components'

import LoansCard from '../components/loans/LoansCard'
import Loader from '../components/common/Loader'
import { useLoans } from '../hooks/useloans'

const Container = styled.div`
  padding: 30px;
`

export default function MyLoans() {
  const { loans, loading } = useLoans()

  if (loading) return <Loader />

  return (
    <Container>
      <h1>Mis Préstamos</h1>
      {loans.length === 0 ? (
        <p>No tienes préstamos activos.</p>
      ) : (
        loans.map((loan) => <LoansCard key={loan._id} loan={loan} />)
      )}
    </Container>
  )
}
