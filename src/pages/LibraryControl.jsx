import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../hooks/useAuth'
import api from '../api/axios'
import { getCategories } from '../api/BooksApi'
import SearchInput from '../components/common/SearchInput'
import CategorySelect from '../components/common/CategorySelect'
import BookGrid from '../components/common/BookGrid'
import Button from '../components/common/Button'
import Loader from '../components/common/Loader'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  gap: 25px;
`

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
  color: #2d3436;
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  width: 320px;
  background: #f5f6fa;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
`

const Label = styled.label`
  font-size: 14px;
  color: #2d3436;
`

const Input = styled.input`
  padding: 8px 10px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
`

const BookItem = styled.div`
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;

  margin-right: 20px;

  &:hover {
    transform: translateY(-2px);
  }
`
const BookTitle = styled.strong`
  width: 100px;
  font-size: 14px;
`

const BookCover = styled.img`
  width: 100px;
  height: 150px;
  object-fit: contain;
  border-radius: 6px;
`

export default function LibraryControl() {
  const { user } = useAuth()
  const [books, setBooks] = useState([])
  const [categories, setCategories] = useState([])
  const [editingBook, setEditingBook] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    available: true,
    covers: null
  })

  const fetchBooks = async () => {
    try {
      const res = await api.get('/books')
      setBooks(Array.isArray(res.data) ? res.data : res.data.books || [])
    } catch (err) {
      console.error('Error al obtener libros:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await getCategories()
      setCategories(res.data)
    } catch (err) {
      console.error('Error al cargar categorías:', err)
    }
  }

  useEffect(() => {
    fetchBooks()
    fetchCategories()
  }, [])

  const handleCreate = async () => {
    setLoading(true)
    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== '') data.append(key, value)
    })
    await api.post('/books', data)
    setMessage('Libro creado correctamente')
    setFormData({
      title: '',
      author: '',
      isbn: '',
      category: '',
      available: true,
      covers: null
    })
    await fetchBooks()
  }

  const handleEdit = (book) => {
    setEditingBook(book._id)
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      category: book.category,
      available: book.available,
      covers: null
    })
  }

  const handleUpdate = async (id) => {
    setLoading(true)
    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== '') data.append(key, value)
    })
    await api.put(`/books/${id}`, data)
    setEditingBook(null)
    setMessage('Libro editado correctamente')
    await fetchBooks()
  }

  const handleDelete = async (id) => {
    setLoading(true)
    await api.delete(`/books/${id}`)
    await fetchBooks()
  }

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <Loader />

  return (
    <Container>
      <Title>Gestión de Libros</Title>

      <Form>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder='Título'
        />
        <Input
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          placeholder='Autor'
        />
        <Input
          value={formData.isbn}
          onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
          placeholder='ISBN'
        />
        <CategorySelect
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          options={categories}
          placeholder='Selecciona categoría'
        />
        <Label>
          <input
            type='checkbox'
            checked={formData.available}
            onChange={(e) =>
              setFormData({ ...formData, available: e.target.checked })
            }
          />{' '}
          Disponible
        </Label>
        <Input
          type='file'
          onChange={(e) =>
            setFormData({ ...formData, covers: e.target.files[0] })
          }
        />
        <Button onClick={handleCreate}>Crear libro</Button>
      </Form>

      {message && <p style={{ color: '#00b894', margin: 0 }}>{message}</p>}

      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Buscar libro por título o autor...'
      />

      <BookGrid>
        {filteredBooks.map((b) => (
          <BookItem key={b._id}>
            {editingBook === b._id ? (
              <>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder='Título'
                />
                <Input
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  placeholder='Autor'
                />
                <Input
                  value={formData.isbn}
                  onChange={(e) =>
                    setFormData({ ...formData, isbn: e.target.value })
                  }
                  placeholder='ISBN'
                />
                <CategorySelect
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  options={categories}
                  placeholder='Selecciona categoría'
                />
                <Label>
                  <input
                    type='checkbox'
                    checked={formData.available}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        available: e.target.checked
                      })
                    }
                  />{' '}
                  Disponible
                </Label>
                <Input
                  type='file'
                  onChange={(e) =>
                    setFormData({ ...formData, covers: e.target.files[0] })
                  }
                />
                <Button bg='#00b894' onClick={() => handleUpdate(b._id)}>
                  Guardar
                </Button>
                <Button bg='#d63031' onClick={() => setEditingBook(null)}>
                  Cancelar
                </Button>
              </>
            ) : (
              <>
                <BookTitle>{b.title}</BookTitle>

                <div>{b.author}</div>
                <div>ISBN: {b.isbn}</div>
                <div>Categoría: {b.category}</div>
                <div>Disponible: {b.available ? 'Sí' : 'No'}</div>
                <BookCover
                  src={b.covers || '/assets/placeholder.png'}
                  alt={b.title}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button bg='#0984e3' onClick={() => handleEdit(b)}>
                    Editar
                  </Button>
                  <Button bg='#d63031' onClick={() => handleDelete(b._id)}>
                    Borrar
                  </Button>
                </div>
              </>
            )}
          </BookItem>
        ))}
      </BookGrid>
    </Container>
  )
}
