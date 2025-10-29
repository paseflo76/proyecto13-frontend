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
`

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
  flex-direction: column;
`

const CategorySection = styled.div`
  diplay: flex;
  flex-direction: column;

  margin-bottom: 45px;
  @media (max-width: 756px) {
    diplay: flex;
    flex-direction: column;
  }
`

const CategoryTitle = styled.h2`
  margin-bottom: 15px;
  text-transform: capitalize;
  border-bottom: 2px solid #ccc;
  padding-bottom: 5px;
`

export default function Books() {
  const [categories, setCategories] = useState([])
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const fetchCategories = async () => {
    try {
      const res = await getCategories()
      setCategories(res.data)
    } catch (err) {
      console.error('Error al cargar categorías:', err)
    }
  }

  const fetchBooks = async (category = '') => {
    setLoading(true)
    try {
      let res
      if (category) res = await getBooksByCategory(category)
      else res = await getBooks()
      setBooks(res.data)
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
    fetchBooks(selectedCategory)
  }, [selectedCategory])

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const booksByCategory = categories.reduce((acc, category) => {
    const booksInCategory = filteredBooks.filter((b) => b.category === category)
    if (booksInCategory.length > 0) acc[category] = booksInCategory
    return acc
  }, {})

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

      {Object.entries(booksByCategory).map(([category, books]) => (
        <CategorySection key={category}>
          <CategoryTitle>{category}</CategoryTitle>
          <BookGrid>
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </BookGrid>
        </CategorySection>
      ))}
    </PageContainer>
  )
}
