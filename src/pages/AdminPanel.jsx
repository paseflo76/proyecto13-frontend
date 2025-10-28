import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllLoans } from '../api/LoansApi'
import Loader from '../components/common/Loader'

const Container = styled.div`
  padding: 30px;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: left;
  }
  @media (max-width: 700px) {
    th,
    td {
      font-size: 12px;
    }
  }
`

export default function AdminPanel() {
  const [loading, setLoading] = useState(true)
  const [loans, setLoans] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await getAllLoans()
        setLoans(res.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchLoans()
  }, [])

  if (loading) return <Loader />
  if (error) return <p>Error: {error}</p>

  return (
    <Container>
      <h1>Panel de Administración</h1>
      <Table>
        <thead>
          <tr>
            <th>Libro</th>
            <th>Usuario</th>
            <th>Fecha préstamo</th>
            <th>Fecha devolución</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan._id}>
              <td>{loan.book ? loan.book.title : '-'}</td>
              <td>{loan.user ? loan.user.userName : '-'}</td>
              <td>
                {loan.loanDate
                  ? new Date(loan.loanDate).toLocaleDateString()
                  : '-'}
              </td>
              <td>
                {loan.returnDate
                  ? new Date(loan.returnDate).toLocaleDateString()
                  : '-'}
              </td>
              <td>{loan.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
