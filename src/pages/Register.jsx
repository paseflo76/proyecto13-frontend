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

export default function Register() {
  const { register } = useAuth()
  const Navigate = useNavigate()
  const [userName, setuserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError('')
    try {
      const res = await register({ userName, email, password })
      console.log('Registro exitoso:', res.data)
      Navigate('/')
    } catch (error) {
      console.log('Error backend:', error.response?.data)
      setError(error.response?.data?.message || 'Error desconocido')
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
        <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type='submit'>Registrarse</Button>
      </Form>
      {error && <p>{error}</p>}
    </Container>
  )
}
