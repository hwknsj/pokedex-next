import SpeciesGrid, {
  ALL_SPECIES_QUERY,
  allSpeciesQueryVariables
} from '../components/species-list'
import styled from '@emotion/styled'
import type { Theme } from '@/styles/theme'
import { css, useTheme } from '@emotion/react'
import {
  initializeApollo,
  addApolloState,
  APOLLO_STATE_PROP_NAME
} from '../lib/apollo-client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Nav } from '@/components/nav'

// const LoadButton = styled.button`
//   ${({ theme }: { theme: Theme }) => css(theme.buttons.primary)};
//   min-height: 4rem;
//   padding: 2rem;
//   font-weight: 800;
//   margin: 0 auto;
//   display: flex;
//   justify-content: center;
//   max-width: 40rem;
// `

const IndexPage = (props: any) => {
  const [search, setSearch] = useState('')
  console.log({ props })
  const {
    data: {
      species,
      aggregate: {
        aggregate: { count }
      }
    },
    loading,
    networkStatus
  } = props

  return (
    <>
      <Nav search={search} setSearch={setSearch} />
      <SpeciesGrid
        search={search}
        setSearch={setSearch}
        species={species}
        count={count}
        loading={loading}
        networkStatus={networkStatus}
      />
    </>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  const { data, loading, error, networkStatus } = await apolloClient.query({
    query: ALL_SPECIES_QUERY,
    variables: allSpeciesQueryVariables,
    notifyOnNetworkStatusChange: true
  })

  return addApolloState(apolloClient, {
    props: { species: data, data, networkStatus, loading },
    revalidate: 1
  })
}

export default IndexPage
