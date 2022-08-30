import { Theme } from '@/styles/theme'
import styled from '@emotion/styled'
import { PropsWithChildren, PropsWithoutRef } from 'react'

export interface TileProps extends PropsWithoutRef<any> {
  image?: string
  theme?: Theme
}

export const TileStyled = styled.div<TileProps>`
  height: 200px;
  box-sizing: border-box;
  /* box-shadow: '8px 8px 16px 0 rgba(0, 0, 0, 0.08)';*/
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.grey5};
  box-shadow: ${({ theme }) => theme.helpers.boxShadow};
  position: relative;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  p {
    text-align: center;
    line-height: 2;
    font-weight: 800;
    flex-grow: 1;
    margin: 0 auto;
    font-size: 1.5rem;
  }
  &:hover,
  &:focus,
  &:active {
    transform: translate3d(2px, -2px, 1em);
    box-shadow: ${({ theme }) => theme.helpers.boxShadowHover};
    cursor: pointer;
    p {
      text-shadow: ${({ theme }) => theme.helpers.boxShadowHover};
      color: ${({ theme }) => theme.colors.kleinBlue};
    }
  }
  transition: all 0.15s ${({ theme }) => theme.helpers.cubicBezier};
`

const Tile = ({
  name,
  image,
  onClick
}: {
  name: string
  image: string
  onClick?: () => void
} & PropsWithChildren) => {
  return (
    <TileStyled>
      <img src={image} alt={name} />
      <p>{name}</p>
    </TileStyled>
  )
}

export default Tile
