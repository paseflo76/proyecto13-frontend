import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getCategories, getBooksByCategory, getBooks } from '../api/BooksApi'
import BookCard from '../components/books/BookCard'
import Loader from '../components/common/Loader'
import SearchInput from '../components/common/SearchInput'
import CategorySelect from '../components/common/CategorySelect'
import BookGrid from '../components/common/BookGrid'

const PageContainer = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  min-height: 80vh;
`
const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
  flex-direction: column;
`
const CategorySection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 45px;
`
const CategoryTitle = styled.h2`
  margin-bottom: 15px;
  text-transform: capitalize;
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 5px;
`
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`
const PageButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: ${({ active }) => (active ? '#6c5ce7' : '#d1beebff')};
  color: ${({ active }) => (active ? 'white' : 'black')};
  cursor: pointer;
`

export default function Books() {
  const [categories, setCategories] = useState([])
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 20

  const fetchCategories = async () => {
    try {
      const res = await getCategories()
      setCategories(res.data)
    } catch (err) {
      console.error('Error al cargar categorías:', err)
    }
  }

  const fetchBooks = async (category = '', pageNumber = 1) => {
    setLoading(true)
    try {
      let res
      if (category) {
        res = await getBooksByCategory(category, pageNumber, limit)
        setBooks(res.data.books)
        setTotalPages(res.data.totalPages)
        setPage(res.data.currentPage)
      } else {
        res = await getBooks(pageNumber, limit)
        setBooks(res.data.books)
        setTotalPages(res.data.totalPages)
        setPage(res.data.currentPage)
      }
    } catch (err) {
      console.error('Error al obtener libros:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchBooks()
  }, [])

  useEffect(() => {
    fetchBooks(selectedCategory, 1)
  }, [selectedCategory])

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <Loader />

  return (
    <PageContainer>
      <FilterContainer>
        <CategorySelect
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          options={categories}
          placeholder='Todas las categorías'
        />
        <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Buscar por título o autor...'
        />
      </FilterContainer>

      <BookGrid>
        {filteredBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </BookGrid>

      {totalPages > 1 && (
        <PaginationContainer>
          {Array.from({ length: totalPages }, (_, i) => (
            <PageButton
              key={i}
              active={i + 1 === page}
              onClick={() => fetchBooks(selectedCategory, i + 1)}
            >
              {i + 1}
            </PageButton>
          ))}
        </PaginationContainer>
      )}
    </PageContainer>
  )
}
