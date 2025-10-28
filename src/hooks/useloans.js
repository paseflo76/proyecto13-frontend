import { useState, useEffect } from 'react'
import { getUserLoans } from '../api/LoansApi'

export const useLoans = () => {
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLoans = async () => {
      setLoading(true)
      try {
        const response = await getUserLoans()
        setLoans(response.data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchLoans()
  }, [])

  return { loans, loading, error }
}
