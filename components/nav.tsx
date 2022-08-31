// @ts-ignore
import { useRouter } from 'next/router'
import { cx } from '@emotion/css'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useApolloClient } from '@apollo/client'
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  Dispatch,
  PropsWithChildren,
  ReactElement,
  SetStateAction
} from 'react'
import { useTheme } from '@/lib/theme-context'

const NavStyles = styled.nav`
  display: grid;
  width: 100%;
  max-width: 100%;
  min-height: 12rem;
  justify-content: center;
  align-items: center;
  .button-container {
    display: flex;
    justify-content: center;
    button {
      ${({ theme }) =>
        css({ ...theme.buttons.small, ...theme.buttons.secondary })};
      color: ${props => props.theme.colors.button.textSecondary};
      &.active {
        ${({ theme }) => css({ ...theme.buttons.primary })};
        color: ${props => props.theme.colors.button.textPrimary};
      }
      &.toggle {
        ${({ theme }) =>
          css({ ...theme.buttons.secondary, ...theme.typeography.button3 })};
        justify-self: right;
        position: fixed;
        right: 2rem;
        width: min-content;
      }
    }
  }
  .search-container {
    display: flex;
  }
`

export interface NavProps extends PropsWithChildren {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

export const Nav = ({ search, setSearch }: NavProps) => {
  const {
    query: { saved }
  } = useRouter()
  const { toggle, dark } = useTheme()

  // TODO: add Apollo cache code to push changes to client cache
  // TODO: some logic with query string or path on button click
  return (
    <NavStyles>
      <div className='button-container'>
        <button type='button' className={`primary active`} onClick={() => {}}>
          All
        </button>
        <button
          type='button'
          className={`secondary disabled`}
          onClick={() => {}}
        >
          Caught
        </button>
        <button className='toggle' onClick={toggle}>
          🌙
        </button>
      </div>
      <div className='search-container'>
        <input
          type='search'
          placeholder='Search'
          aria-label='Search'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
    </NavStyles>
  )
}

export default Nav
