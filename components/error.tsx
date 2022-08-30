import { ApolloError } from '@apollo/client'

export const ErrorMessage = ({
  message
}: {
  message: string | ApolloError
}) => {
  return (
    // @ts-ignore
    <aside>
      {message}
      <style jsx>{`
        aside {
          padding: 1.5em;
          font-size: 14px;
          color: white;
          background-color: red;
        }
      `}</style>
    </aside>
  )
}
