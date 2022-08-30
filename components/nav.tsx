import { useRouter } from 'next/router'
import Link from 'next/link'

export const Nav = () => {
  const { pathname } = useRouter()

  return (
    <nav>
      <Link href='/'>
        <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
      </Link>
    </nav>
  )
}

export default Nav
