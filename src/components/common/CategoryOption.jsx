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
  border-radius: 10px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
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

const CATEGORY_ICONS = {
  fantasy: '/assets/hada.png',
  horror: '/assets/horror.png',
  romance: '/assets/romance.png',
  science: '/assets/science.png',
  children: '/assets/children.png',
  technology: '/assets/Bonbilla.png',
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
  trueCrime: '/assets/crime.png'
}

export default function CategoryCarousel({ categories, onSelect }) {
  return (
    <Wrapper>
      <h1>Category</h1>
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
