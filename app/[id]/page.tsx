type Props = {
  params: Promise<{ id: string }>
}

type CharacterItems = Record<
  string,
  {
    id: number
    name: string
    route: string
  }
>
function normalize(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
}
export async function generateStaticParams() {
  const res = await fetch(
    'https://gi.yatta.moe/api/v2/pt/avatar',
    { cache: 'force-cache' }
  )

  const json = await res.json()

  const items: CharacterItems = json.data.items

  return Object.values(items).map((char) => ({
    slug: normalize(char.route || char.name)
  }))
  
}

export default async function Page({ params }: Props) {
  let id = (await params).id;
  const res = await fetch(
    'https://gi.yatta.moe/api/v2/pt/avatar',
    { cache: 'force-cache' }
  )

  const json = await res.json()
  const items: CharacterItems = json.data.items

  const slug = normalize(id = (() => {
  switch (id) {
    case 'traveler-pyro':
      return 'pyro-traveler-boy'
    case 'hydro-traveler-boy':
      return 'traveler-hydro'
    case 'traveler-dendro':
      return 'dendro-traveler-boy'
    case 'electro-traveler-boy':
      return 'traveler-electro'
    case 'anemo-traveler-boy':
      return 'traveler-anemo'
    case 'geo-traveler-boy':
      return 'traveler-geo'
    default:
      return id
  }
})())

  const character = Object.values(items).find((char) => {
    return (
      normalize(char.route) === slug ||
      normalize(char.name) === slug
    )
  })

  if (!character) {
    throw new Error('Personagem não encontrado')
  }

  const characterRes = await fetch(
    `https://gi.yatta.moe/api/v2/pt/avatar/${character.id}?vh=63F3`,
    { cache: 'force-cache' }
  )

  const characterData = await characterRes.json()

  return (
    <div>
      <h1>{characterData.data.name}</h1>
      <p>{characterData.data.fetter.title}</p>
    </div>
  )
}