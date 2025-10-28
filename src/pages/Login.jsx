import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 220px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`

const Input = styled.input`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
`

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #d1beebff;
`

export default function Login() {
  const { login } = useAuth()
  const [userName, setuserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await login({ userName, password })
      if (res.success) navigate('/')
      else setError(res.message)
    } catch (err) {
      setError(err.response?.data?.message || 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type='text'
          placeholder='userName'
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
          disabled={loading}
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <Button type='submit' disabled={loading}>
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </Button>
      </Form>
      {error && <p>{error}</p>}
    </Container>
  )
}
