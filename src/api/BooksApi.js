import api from './axios'

export const getBooks = (page = 1, limit = 20) =>
  api.get('/books', {
    params: { page, limit }
  })

export const getCategories = () => api.get('/books/categories')

export const getBookById = (id) => api.get(`/books/${id}`)

export const getBooksByCategory = (category, page = 1, limit = 20) =>
  api.get(`/books/category/${category}`, {
    params: { page, limit }
  })

export const searchBooks = (query = '', page = 1, limit = 20) =>
  api.get('/books/search', { params: { query, page, limit } })

export const postBook = (bookData) => {
  const formData = new FormData()
  Object.entries(bookData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) formData.append(key, value)
  })
  return api.post('/books', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const putBook = (id, bookData) => {
  const formData = new FormData()
  Object.entries(bookData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) formData.append(key, value)
  })
  return api.put(`/books/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const deleteBook = (id) => api.delete(`/books/${id}`)
