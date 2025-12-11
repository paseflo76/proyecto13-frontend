import styled from 'styled-components'

const Wrapper = styled.div`
  margin-bottom: 20px;
`

const Scroll = styled.div`
  display: flex;
  gap: 18px;
  overflow-x: auto;
  padding-bottom: 10px;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #c3b2dd;
    border-radius: 4px;
  }
`

const CategoryCard = styled.div`
  min-width: 130px;
  cursor: pointer;
  text-align: center;
`

const CategoryImage = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 12px;
  object-fit: cover;
  background: #eee;
`

const CategoryName = styled.div`
  margin-top: 6px;
  font-size: 14px;
  text-transform: capitalize;
`

// 🔥 AQUÍ DEFINES TUS ICONOS EXACTOS
const CATEGORY_ICONS = {
  fantasy: '/assets/hada.png',
  horror: '/assets/horror.png',
  romance: '/assets/romance.png',
  science: '/assets/science.png',
  children: '/assets/children.png',
  tecnologia: '/assets/Bonbilla.png',
  fiction: '/assets/ovni.png',
  history: '/assets/history.png',
  biography: '/assets/libro.png',
  mystery: '/assets/desconocido.png',
  adventure: '/assets/mapa.png',
  selfHelp: '/assets/selfhelp.png',
  philosophy: '/assets/pregunta.png',
  poetry: '/assets/poesia.png',
  travel: '/assets/viajar.png',
  cookbook: '/assets/cocinar.png',
  art: '/assets/arte.png',
  comic: '/assets/comic.png',
  graphicNovel: '/assets/novela.png',
  trueCcrime: '/assets/crime.png'
}

export default function CategoryCarousel({ categories, onSelect }) {
  return (
    <Wrapper>
      <Scroll>
        {categories.map((cat) => {
          const image = CATEGORY_ICONS[cat] || '/assets/default.png'

          return (
            <CategoryCard key={cat} onClick={() => onSelect(cat)}>
              <CategoryImage src={image} alt={cat} />
              <CategoryName>{cat}</CategoryName>
            </CategoryCard>
          )
        })}
      </Scroll>
    </Wrapper>
  )
}
