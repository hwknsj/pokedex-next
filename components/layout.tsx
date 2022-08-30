import { PropsWithChildren } from 'react'
import Nav from './nav'

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  )
}

export default Layout
