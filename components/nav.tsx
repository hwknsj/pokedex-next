import { useRouter } from 'next/router'
import { cx } from '@emotion/css'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

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
      &.active {
        ${({ theme }) => css({ ...theme.buttons.primary })};
      }
    }
  }
  .search-container {
    display: flex;
  }
`

export const Nav = () => {
  const {
    query: { saved }
  } = useRouter()
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
      </div>
      <div className='search-container'>
        <input
          type='search'
          placeholder='Search'
          aria-label='Search'
          onChange={() => {}}
        />
      </div>
    </NavStyles>
  )
}

export default Nav
