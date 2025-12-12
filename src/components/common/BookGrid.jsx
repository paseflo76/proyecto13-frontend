import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${(props) => props.gap || '15px'};
  width: 100%;
  justify-items: center;

  @media (max-width: 756px) {
    grid-template-columns: repeat(2, 172px);
    margin-left: 22px;
  }
`

export default function BookGrid({ children, gap }) {
  return <Grid gap={gap}>{children}</Grid>
}
