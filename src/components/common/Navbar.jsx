import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../../hooks/useAuth'

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: var(--color-text1);
  color: var(--color-text2);
  position: sticky;
  top: 0;
  z-index: 1000;
`

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`

const Emblem = styled.img`
  width: 42px;
  border-radius: 5px;
`

const MenuIcon = styled.img`
  width: 32px;
  cursor: pointer;
  display: none;
  filter: brightness(0) invert(1);

  @media (max-width: 750px) {
    display: block;
    width: 40px;
  }
`

const Links = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 750px) {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    flex-direction: column;
    background-color: #222222eb;
    align-items: center;
    gap: 20px;
    padding: 20px 0;
border-radius:10px
    transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(-100%)')};
    opacity: ${({ open }) => (open ? 1 : 0)};
    transition: all 0.4s ease;
    pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
  }
`

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export default function Navbar() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
    setMenuOpen(false)
  }

  return (
    <Nav>
      <Logo>
        <Emblem src='/assets/estante.png' alt='Library' />
      </Logo>

      <Links open={menuOpen}>
        {token && (
          <>
            <StyledLink to='/' onClick={() => setMenuOpen(false)}>
              Inicio
            </StyledLink>

            <StyledLink to='/books' onClick={() => setMenuOpen(false)}>
              Libros
            </StyledLink>

            <StyledLink to='/my-loans' onClick={() => setMenuOpen(false)}>
              Mis Préstamos
            </StyledLink>

            <StyledLink to='/admin' onClick={() => setMenuOpen(false)}>
              Admin
            </StyledLink>

            <StyledLink
              to='/library-control'
              onClick={() => setMenuOpen(false)}
            >
              Control Biblioteca
            </StyledLink>

            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        )}

        {!token && (
          <>
            <StyledLink to='/login' onClick={() => setMenuOpen(false)}>
              Login
            </StyledLink>

            <StyledLink to='/register' onClick={() => setMenuOpen(false)}>
              Registro
            </StyledLink>
          </>
        )}
      </Links>

      <MenuIcon
        src='/assets/menu.png'
        alt='Menu'
        onClick={() => setMenuOpen(!menuOpen)}
      />
    </Nav>
  )
}
