import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getCategories, getBooksByCategory, getBooks } from '../api/BooksApi'
import BookCard from '../components/books/BookCard'
import Loader from '../components/common/Loader'
import SearchInput from '../components/common/SearchInput'
import BookGrid from '../components/common/BookGrid'
import CategoryOption from '../components/common/CategoryOption'

const PageContainer = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  min-height: 80vh;
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
  background-color: ${({ $active }) => ($active ? '#6c5ce7' : '#d1beebff')};
  color: ${({ $active }) => ($active ? 'white' : 'black')};
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

  useEffect(() => {
    loadCategories()
    loadBooks()
  }, [])

  const loadCategories = async () => {
    try {
      const res = await getCategories()
      setCategories(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const loadBooks = async (category = '', pageNumber = 1) => {
    setLoading(true)
    try {
      let res
      if (category) {
        res = await getBooksByCategory(category, pageNumber, limit)
      } else {
        res = await getBooks(pageNumber, limit)
      }

      setBooks(res.data.books)
      setTotalPages(res.data.totalPages)
      setPage(res.data.currentPage)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filteredBooks = books.filter((b) => {
    const text = searchTerm.toLowerCase()
    return (
      b.title.toLowerCase().includes(text) ||
      b.author.toLowerCase().includes(text)
    )
  })

  if (loading) return <Loader />

  return (
    <PageContainer>
      <CategoryOption
        categories={categories}
        onSelect={(cat) => {
          setSelectedCategory(cat)
          loadBooks(cat, 1)
        }}
      />

      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Buscar por título o autor...'
      />

      <BookGrid>
        {filteredBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </BookGrid>

      {totalPages > 1 && (
        <PaginationContainer>
          <PageButton
            $active={false}
            disabled={page === 1}
            onClick={() => page > 1 && loadBooks(selectedCategory, page - 1)}
          >
            &lt;
          </PageButton>

          {Array.from({ length: totalPages }, (_, i) => (
            <PageButton
              key={i}
              $active={page === i + 1}
              onClick={() => loadBooks(selectedCategory, i + 1)}
            >
              {i + 1}
            </PageButton>
          ))}

          <PageButton
            $active={false}
            disabled={page === totalPages}
            onClick={() =>
              page < totalPages && loadBooks(selectedCategory, page + 1)
            }
          >
            &gt;
          </PageButton>
        </PaginationContainer>
      )}
    </PageContainer>
  )
}
