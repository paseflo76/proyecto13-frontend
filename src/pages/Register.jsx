import { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/common/Loader'

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
const ErrorMessage = styled.p`
  color: var(--color-error);
  font-weight: bold;
  margin-top: 5px;
  font-size: 0.9rem;
`

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [userName, setuserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    try {
      const res = await register({ userName, email, password })
      if (res.success) navigate('/')
      else if (res.details) setErrors(res.details)
      else setErrors({ general: res.message })
    } catch (err) {
      setErrors({ general: err.response?.data?.message || 'Error desconocido' })
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />

  return (
    <Container>
      <h1>Registro</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type='text'
          placeholder='userName'
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
        />
        {errors.userName && <ErrorMessage>{errors.userName}</ErrorMessage>}{' '}
        <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}{' '}
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}{' '}
        <Button type='submit'>Registrarse</Button>
        {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}{' '}
      </Form>
    </Container>
  )
}
