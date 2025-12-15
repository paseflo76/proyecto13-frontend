import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  padding: 8px;
  font-size: 15px;
  border-radius: 10px;
  width: ${(props) => props.width || '250px'};
  margin: ${(props) => props.margin || '10px'};
  border: none;
`

export default function SearchInput({
  value,
  onChange,
  placeholder,
  width,
  margin,
  onKeyDown
}) {
  return (
    <StyledInput
      type='text'
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      width={width}
      margin={margin}
    />
  )
}
