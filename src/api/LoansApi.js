import api from './axios'

export const getUserLoans = () => {
  const token = localStorage.getItem('token')
  return api.get('/loans/myloans', {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const postLoan = (loanData) => {
  const token = localStorage.getItem('token')
  return api.post('/loans', loanData, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const patchLoan = (id, loanData) => {
  const token = localStorage.getItem('token')
  return api.patch(`/loans/${id}/return`, loanData, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const getLoan = (id) => {
  const token = localStorage.getItem('token')
  return api.get(`/loans/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const getAllLoans = () => {
  const token = localStorage.getItem('token')
  return api.get('/loans/all', {
    headers: { Authorization: `Bearer ${token}` }
  })
}
