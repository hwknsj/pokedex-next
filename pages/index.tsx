import SpeciesGrid, {
  ALL_SPECIES_QUERY,
  allSpeciesQueryVariables
} from '../components/species-list'
import { initializeApollo, addApolloState } from '../lib/apollo-client'

const IndexPage = () => <SpeciesGrid />

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ALL_SPECIES_QUERY,
    variables: allSpeciesQueryVariables
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1
  })
}

export default IndexPage
