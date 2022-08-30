import { gql, useQuery, NetworkStatus } from '@apollo/client'
import styled from '@emotion/styled'
import { css, useTheme } from '@emotion/react'
import { useRef } from 'react'
import Tile from './tile'

const SpeciesGridStyles = styled.section`
  display: grid;
  /* grid-template-columns: 1fr 1fr; */
  /* grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  /* grid-auto-rows: 2; */
  grid-gap: 4rem;
  align-items: stretch;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`

const LoadButton = styled.button`
  ${({ theme }) => css(theme.buttons.primary)};
  min-height: 4rem;
  padding: 2rem;
  font-weight: 800;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  max-width: 40rem;
`

export const ALL_SPECIES_QUERY = gql`
  query allGen1Pokemon(
    $language_id: Int = 9
    $generation_id: Int = 1
    $limit: Int
    $offset: Int
  ) {
    species: pokemon_v2_pokemonspecies(
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
        sprites: pokemon_v2_pokemonsprites {
          urls: sprites
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

export const SpeciesGrid = () => {
  const offset = useRef(0)
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_SPECIES_QUERY,
    {
      variables: allSpeciesQueryVariables,
      notifyOnNetworkStatusChange: true
    }
  )

  const theme = useTheme()
  console.log({ theme })

  const loadingMoreSpecies = networkStatus === NetworkStatus.fetchMore
  const {
    species,
    pokemon_v2_pokemonspecies_aggregate: {
      aggregate: { count }
    }
  } = data
  console.log({ data })

  const loadMoreSpecies = () => {
    offset.current += species.length
    if (offset.current > count) {
      offset.current = count - 1
    }
    fetchMore({
      variables: {
        offset: offset.current
      }
    })
  }

  if (error) return <p>Error loading posts.</p>
  if (loading && !loadingMoreSpecies) return <p>Loading</p>

  const areMoreSpecies = species.length < count

  return (
    <section>
      {/* TODO: turn into a grid */}
      <SpeciesGridStyles>
        {species.map((poke: any, index: number) => {
          const { urls } = poke.pokemon_v2_pokemons[0].sprites[0]
          const frontDefault = JSON.parse(urls)['front_default']
          return (
            <Tile key={poke.id} image={frontDefault} name={poke.name}>
              <a href='#'>{poke.name}</a>
            </Tile>
          )
        })}
      </SpeciesGridStyles>
      <div>
        {areMoreSpecies && (
          <LoadButton
            type='button'
            className='btn btn-center'
            onClick={() => loadMoreSpecies()}
            disabled={loadingMoreSpecies || loading}
          >
            {loadingMoreSpecies ? `loading` : `pokémon plz`}
          </LoadButton>
        )}
      </div>
    </section>
  )
}

export default SpeciesGrid
