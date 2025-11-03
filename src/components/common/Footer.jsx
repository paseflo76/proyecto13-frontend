import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  background-color: var(--color-footer);
  color: var(--color-text2);
  text-align: center;
  padding: 24px 10px;
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
