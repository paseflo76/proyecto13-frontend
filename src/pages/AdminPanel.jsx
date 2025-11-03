import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllLoans } from '../api/LoansApi'
import Loader from '../components/common/Loader'

const Container = styled.div`
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-background);
  min-height: 100vh;
`

const Title = styled.h1`
  margin-bottom: 30px;
  color: var(--color-text1);
  font-size: 2rem;
  text-align: center;
`

const TableWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow-x: auto;

  @media (max-width: 750px) {
    border-radius: 20px;
    box-shadow: none;
    width: 100vw;
  
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  min-width: 600px;

  th {
    background-color: var(--color-primary);
    color: var(--color-text2);
    padding: 14px;
    text-align: left;
    font-weight: 600;
    white-space: nowrap;
  }

  td {
    padding: 12px 14px;
    border-bottom: 1px solid #ddd;
  }

  tr:hover {
    background-color: #f1f2f6;
    transition: background-color 0.2s ease;
  }

  @media (max-width: 750px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: auto;
    font-size: 12px;

    th,
    td {
      padding: 10px;
    }
  }
`

const Status = styled.span`
  padding: 5px 10px;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  background-color: ${({ status }) =>
    status === 'returned'
      ? '#00b894'
      : status === 'pending'
      ? '#fdcb6e'
      : '#d63031'};
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
      <Title>Panel de Administración</Title>
      <TableWrapper>
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
                <td>
                  <Status status={loan.status}>{loan.status}</Status>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  )
}
