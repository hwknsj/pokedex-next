import { gql, useQuery, NetworkStatus } from '@apollo/client'

export const ALL_SPECIES_QUERY = gql`
  query allGen1Pokemon(
    $language_id: Int = 9
    $generation_id: Int = 1
    $limit: Int
    $offset: Int
  ) {
    pokemon_v2_pokemonspecies(
      where: { generation_id: { _eq: $generation_id } }
      limit: $limit
      offset: $offset
    ) {
      name
      id
      evolution_chain_id
      evolves_from_species_id
      base_happiness
      capture_rate
      forms_switchable
      gender_rate
      generation_id
      has_gender_differences
      hatch_counter
      is_baby
      is_legendary
      is_mythical
      pokemon_v2_pokemons {
        pokemon_v2_pokemonsprites {
          sprites
        }
      }
      pokemon_v2_pokemonspeciesdescriptions(
        where: { id: { _eq: $language_id } }
      ) {
        description
      }
    }
    pokemon_v2_pokemonspecies_aggregate(
      where: { generation_id: { _eq: $generation_id } }
    ) {
      aggregate {
        count
      }
    }
  }
`

export const allSpeciesQueryVariables = {
  offset: 0,
  limit: 25
}

export default function PostList() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_SPECIES_QUERY,
    {
      variables: allSpeciesQueryVariables,
      notifyOnNetworkStatusChange: true
    }
  )

  const loadingMoreSpecies = networkStatus === NetworkStatus.fetchMore
  const { pokemon_v2_pokemonspecies, pokemon_v2_pokemonspecies_aggregate } =
    data

  const loadMoreSpecies = () => {
    fetchMore({
      variables: {
        offset: pokemon_v2_pokemonspecies.length
      }
    })
  }

  if (error) return <p>Error loading posts.</p>
  if (loading && !loadingMoreSpecies) return <p>Loading</p>

  // TODO: fix this, or paginate
  const areMoreSpecies =
    pokemon_v2_pokemonspecies.length < pokemon_v2_pokemonspecies_aggregate.count

  return (
    <section>
      {/* TODO: turn into a grid */}
      <ul>
        {pokemon_v2_pokemonspecies.map((poke: any, index: number) => (
          <li key={poke.id}>
            <span>{index + 1}. </span>
            <a href='#'>{poke.name}</a>
          </li>
        ))}
      </ul>
      {areMoreSpecies && (
        <button
          onClick={() => loadMoreSpecies()}
          disabled={loadingMoreSpecies || loading}
        >
          {loadingMoreSpecies ? `loading` : `pokémon plz`}
        </button>
      )}
    </section>
  )
}
