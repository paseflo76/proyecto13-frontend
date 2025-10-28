import { useEffect, useState } from 'react'
import { getBooks as fetchBooks } from '../api/BooksApi'
export const useBooks = () => {
  const [books, setbooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const response = await fetchBooks()
        setbooks(response.data)
      } catch (error) {
        setError('Error al cargar los libros')
      } finally {
        setLoading(false)
      }
    }
    loadBooks()
  }, [])

  return { books, loading, error }
}
