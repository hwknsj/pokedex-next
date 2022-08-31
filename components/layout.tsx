import { PropsWithChildren } from 'react'
import Nav from './nav'

export const Layout = ({ children }: PropsWithChildren) => {
  return <main>{children}</main>
}

export default Layout
