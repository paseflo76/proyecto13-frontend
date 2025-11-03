import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  background-color: #222;
  color: #ccc;
  text-align: center;
  padding: 20px 10px;
  font-size: 16px;
  margin-top: auto;
`

export default function Footer() {
  return (
    <FooterContainer>
      <p>© 2025 El Estante Rebelde. All rights reserved.</p>
    </FooterContainer>
  )
}
