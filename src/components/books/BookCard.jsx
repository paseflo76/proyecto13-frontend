import styled from 'styled-components'
import { useAuth } from '../../hooks/useAuth'
import { useState } from 'react'
import { postLoan } from '../../api/LoansApi'
import Button from '../common/Button'

const CardBooks = styled.div`
  background-color: var(--color-card);
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 190px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;

  @media (max-width: 756px) {
    width: 160px;
    padding: 10px;
    margin-right: 70px;
  }
`

const BookBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`

const Title = styled.h3`
  margin: 0;
  font-size: 13px;
  line-height: 1.2;
  text-align: center;

  @media (max-width: 756px) {
    font-size: 15px;
  }
`

const Author = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 1.2;
`

const Category = styled.p`
  margin: 0;
  font-size: 11px;
  line-height: 1.1;
  color: #333;
`

const Cover = styled.img`
  width: 100%;
  height: 220px;
  object-fit: contain;
  border-radius: 8px;

  @media (max-width: 756px) {
    height: 180px;
  }
`

export default function BookCard({ book }) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLoan = async () => {
    if (!user) {
      setMessage('Debes iniciar sesión para pedir un préstamo')
      return
    }

    setLoading(true)
    try {
      await postLoan({ bookId: book._id, userId: user._id })
      setMessage('Préstamo realizado')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error al pedir préstamo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CardBooks>
      <BookBox>
        <Title>{book.title}</Title>
        <Author>{book.author}</Author>
        <Category>Categoría: {book.category}</Category>
        <Cover src={book.covers || '/assets/no-img.png'} alt={book.title} />
        <Button
          onClick={handleLoan}
          disabled={loading || !book.available}
          $bg={book.available ? '#6c5ce7' : '#e76d6dff'}
        >
          {book.available ? 'Pedir préstamo' : 'No disponible'}
        </Button>
        {message && <p style={{ fontSize: '11px', margin: 0 }}>{message}</p>}
      </BookBox>
    </CardBooks>
  )
}
