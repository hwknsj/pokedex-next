import { PropsWithChildren } from 'react'

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      {children}
      <style jsx global>{`
        html {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
          scroll-behavior: smooth;
          font-size: 62.5%;
        }
        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }
        body {
          margin: 0;
          min-height: 100%;
          font-size: 1.6rem;
          font-family: Times, 'Times New Roman', Menlo, 'Lucida Console',
            'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono',
            'Courier New', monospace, serif;
        }
        a {
          color: #0a5bc3;
        }
      `}</style>
    </main>
  )
}

export default Layout
