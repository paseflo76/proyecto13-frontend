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
const ErrorMessage = styled.p`
  color: var(--color-error);
  font-weight: bold;
  font-size: 0.9rem;
`

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!userName) e.userName = 'El usuario es obligatorio'
    if (!password) e.password = 'La contraseña es obligatoria'
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

    const res = await login({ userName, password })

    if (res.success) navigate('/')
    else if (res.details) setErrors(res.details)
    else setErrors({ general: 'Credenciales incorrectas' })

    setLoading(false)
  }

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder='userName'
          disabled={loading}
        />
        {errors.userName && <ErrorMessage>{errors.userName}</ErrorMessage>}

        <Input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          disabled={loading}
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

        <Button type='submit' disabled={loading}>
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </Button>

        {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}
      </Form>
    </Container>
  )
}
