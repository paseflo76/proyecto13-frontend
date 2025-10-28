import styled from 'styled-components'

const StyledButton = styled.button`
  padding: ${(props) => props.padding || '8px 15px'};
  background-color: ${(props) => props.bg || '#6c5ce7'};
  color: ${(props) => props.color || 'white'};
  border: none;
  border-radius: ${(props) => props.radius || '6px'};
  cursor: pointer;
  font-size: ${(props) => props.fontSize || '12px'};
  transition: 0.5s ease;

  &:hover {
    opacity: 0.9;
  }
`

export default function Button({
  children,
  onClick,
  type,
  bg,
  color,
  radius,
  padding,
  fontSize
}) {
  return (
    <StyledButton
      type={type || 'button'}
      onClick={onClick}
      bg={bg}
      color={color}
      radius={radius}
      padding={padding}
      fontSize={fontSize}
    >
      {children}
    </StyledButton>
  )
}
