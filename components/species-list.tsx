import { gql, useQuery, NetworkStatus } from '@apollo/client'
import styled from '@emotion/styled'
import { css, useTheme } from '@emotion/react'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import Tile from './tile'
import type { Theme } from '@/styles/theme'
import { useRouter } from 'next/router'
import Link from 'next/link'

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
    aggregate: pokemon_v2_pokemonspecies_aggregate(
      where: { generation_id: { _eq: $generation_id } }
    ) {
      aggregate {
        count
      }
    }
  }
`

export const allSpeciesQueryVariables = {
  offset: 0
  // limit: 0
}

export const SpeciesGrid = ({
  species,
  count,
  loading,
  networkStatus
}: {
  species: any
  count: number
  loading: boolean
  networkStatus: any
}) => {
  const [saved, setSaved] = useState<number[]>([])
  // const [offset, setOffset] = useState(species.length)
  // const offset = useRef(species.length)
  // const { loading, error, data, fetchMore, networkStatus } = useQuery(
  //   ALL_SPECIES_QUERY,
  //   {
  //     variables: allSpeciesQueryVariables,
  //     notifyOnNetworkStatusChange: true
  //   }
  // )

  const { pathname, query } = useRouter()

  const handleSave = (poke: any) => {
    const { id } = poke
    // @ts-ignore
    const index = saved.indexOf(id)
    if (index >= 0) {
      // id exists in saved
      setSaved([...saved.slice(0, index), ...saved.slice(index + 1)])
      return
    } else {
      setSaved([...saved, id])
    }
    console.log({ saved })
    return saved
  }

  const theme = useTheme()
  console.log({ theme })

  const loadingMoreSpecies = networkStatus === NetworkStatus.fetchMore
  // const {
  //   species,
  //   pokemon_v2_pokemonspecies_aggregate: {
  //     aggregate: { count }
  //   }
  // } = data
  // console.log({ data })

  // const loadMoreSpecies = () => {
  //   if (offset.current > count) {
  //     offset.current = count - 1
  //   }
  //   fetchMore({
  //     variables: {
  //       offset: offset.current
  //     }
  //   })
  // }

  // if (error) return <p>Error loading posts.</p>
  if (loading && !loadingMoreSpecies) return <p>Loading</p>

  // const areMoreSpecies = species.length < count

  return (
    <SpeciesGridStyles>
      {species.map((poke: any, index: number) => {
        const { urls } = poke.pokemon_v2_pokemons[0].sprites[0]
        const frontDefault = JSON.parse(urls)['front_default']
        return (
          <Link key={poke.id} href={`/p/${poke.id}`}>
            <a>
              <Tile
                image={frontDefault}
                name={poke.name}
                onClick={() => handleSave(poke.id)}
              >
                <p>{poke.name}</p>
              </Tile>
            </a>
          </Link>
        )
      })}
    </SpeciesGridStyles>
    // <div>
    //   {/* areMoreSpecies && (
    //     <LoadButton
    //       type='button'
    //       className='btn btn-center'
    //       onClick={() => loadMoreSpecies()}
    //       disabled={loadingMoreSpecies || loading}
    //     >
    //       {loadingMoreSpecies ? `loading` : `pokémon plz`}
    //     </LoadButton>
    //   ) */}
    // </div>
  )
}

export default SpeciesGrid
