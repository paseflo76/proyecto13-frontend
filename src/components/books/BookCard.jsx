import styled from 'styled-components'
import { useAuth } from '../../hooks/useAuth'
import { useState } from 'react'
import { postLoan } from '../../api/LoansApi'
import Button from '../common/Button'

const CardBooks = styled.div`
  background-color: #d1cfe9ff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transform: scale(0.7);
  transform-origin: top left;

  @media (max-width: 756px) {
    width: 180px;
    font-size: 20px;
  }
`

const Title = styled.h3`
  margin: 0;
  font-size: 14px;
  @media (max-width: 756px) {
    font-size: 20px;
  }
`

const Cover = styled.img`
  width: 100%;
  height: 280px;
  object-fit: contain;
  border-radius: 10px;
  margin-top: 8px;

  @media (max-width: 756px) {
    height: 200px;
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
      <Title>{book.title}</Title>
      <p>{book.author}</p>
      <p>Categoría: {book.category}</p>
      <Cover src={book.covers || '/assets/no-img.png'} alt={book.title} />
      <Button
        onClick={handleLoan}
        disabled={loading || !book.available}
        bg={book.available ? '#6c5ce7' : '#aaa'}
      >
        {book.available ? 'Pedir préstamo' : 'No disponible'}
      </Button>
      {message && <p>{message}</p>}
    </CardBooks>
  )
}
