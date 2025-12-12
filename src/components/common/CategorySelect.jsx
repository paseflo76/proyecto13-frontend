import styled from 'styled-components'

const StyledSelect = styled.select`
  padding: 8px;
  font-size: 15px;
  border-radius: 10px;
  border: none;
  margin: ${(props) => props.margin || '10px'};
`

export default function CategorySelect({
  value,
  onChange,
  options,
  margin,
  placeholder
}) {
  return (
    <StyledSelect value={value} onChange={onChange} margin={margin}>
      {placeholder && <option value=''>{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </StyledSelect>
  )
}
