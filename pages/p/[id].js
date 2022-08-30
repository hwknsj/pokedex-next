import { useRouter } from 'next/router'
import Head from 'next/head'
import { useQuery, gql } from '@apollo/client'
import { useApollo } from '@/lib/apollo-client'

import { ErrorMessage } from '@/components/error'

const SINGLE_POKEMON_QUERY = gql`
  query singlePokemon($id: Int!) {
    pokemon: pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
      height
      name
      pokemon_species_id
      base_experience
      weight
      sprites: pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`

const PokemonPage = props => {
  console.log({ props })

  const { pathname, query } = useRouter()
  console.log({ pathname, query })

  const { data, loading, error } = useQuery(SINGLE_POKEMON_QUERY, {
    variables: { id: query.id }
  })

  console.log({ data })

  const {
    pokemon: {
      height,
      name,
      weight,
      base_experience,
      sprites: { sprites }
    }
  } = data

  const image = JSON.parse(sprites)['front_shiny']

  if (loading) {
    return <p>loading...</p>
  }

  if (error) return <ErrorMessage message={error} />

  // TODO: instead of fetching new data, use Apollo Store (we've already fetched this data!)

  return (
    <>
      {/* <Head>
        <title>🥇 {name} | Pokédex</title>
      </Head> */}
      <article>
        <h1>coming soon!</h1>
        {/* <aside>
          <h1>{name}</h1>
          <dl>
            <dt>height</dt>
            <dd>{height}</dd>
            <dt>weight</dt>
            <dd>{weight}</dd>
            <dt>base experience</dt>
            <dd>{base_experience}</dd>
          </dl>
        </aside>
        <div>
          <img src={image} alt={`Shiny ${name}`} />
        </div> */}
      </article>
    </>
  )
}

export default PokemonPage
