import styled, { keyframes } from 'styled-components'

const spin = keyframes`
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
`
const Spinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  animation: ${spin} 2s linear infinite;
  margin: auto;
  margin-top: 220px;
`
export default function Loader() {
  return <Spinner />
}
