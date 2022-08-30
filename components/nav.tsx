import { useRouter } from 'next/router'
// import { cx } from '@emotion/css'

export const Nav = () => {
  const {
    query: { caught }
  } = useRouter()
  // TODO: some logic with query string or path on button click
  return (
    <nav>
      <button type='button' className={`active`} onClick={() => {}}>
        All
      </button>
      <button type='button' className={`disabled`} onClick={() => {}}>
        Caught
      </button>
      <input
        type='text'
        placeholder='Search'
        aria-label='Search'
        onChange={() => {}}
      />
    </nav>
  )
}

export default Nav
