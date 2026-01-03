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
  font-size: 0.9rem;
`

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}

    if (!userName || userName.length < 3) e.userName = 'Mínimo 3 caracteres'

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) e.email = 'Email no válido'

    if (!password || password.length < 6) e.password = 'Mínimo 6 caracteres'

    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    setErrors({})

    const res = await register({ userName, email, password })

    if (res.success) navigate('/')
    else if (res.details) setErrors(res.details)
    else setErrors({ general: 'Error en el registro' })

    setLoading(false)
  }

  if (loading) return <Loader />

  return (
    <Container>
      <h1>Registro</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder='userName'
        />
        {errors.userName && <ErrorMessage>{errors.userName}</ErrorMessage>}

        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

        <Input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

        <Button type='submit'>Registrarse</Button>
        {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}
      </Form>
    </Container>
  )
}
