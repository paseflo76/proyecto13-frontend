import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import MyLoans from './pages/MyLoans'
import AdminPanel from './pages/AdminPanel'
import Books from './pages/Books'
import { AuthProvider } from './components/context/AuthContext'
import Navbar from './components/common/Navbar'
import ProtectedRoute from './components/common/ProtectedRoute'
import NotFound from './pages/NotFound'
import RoutePrivate from './components/common/RoutePrivate'
import LibraryControl from './pages/LibraryControl'
import Footer from './components/common/Footer'
import { GlobalStyle } from './GlobalStyle'

const Container = styled.div`
  min-height: 100vh;
  background-color: #e2dcc5;
`

function App() {
  const location = useLocation()
  const hideFooter =
    location.pathname === '/login' || location.pathname === '/register'

  return (
    <AuthProvider>
      <GlobalStyle />
      <Container>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={
              <RoutePrivate>
                <Home />
              </RoutePrivate>
            }
          />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route
            path='/books'
            element={
              <RoutePrivate>
                <Books />
              </RoutePrivate>
            }
          />
          <Route
            path='/library-control'
            element={
              <RoutePrivate requireAdminOrLibrarian>
                <LibraryControl />
              </RoutePrivate>
            }
          />

          <Route
            path='/my-loans'
            element={
              <ProtectedRoute>
                <MyLoans />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin'
            element={
              <ProtectedRoute requireAdmin>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route path='/404' element={<NotFound />} />
          <Route path='*' element={<Navigate to='/404' />} />
        </Routes>
        {!hideFooter && <Footer />}
      </Container>
    </AuthProvider>
  )
}

export default App
