type Props = {
  params: {
    id: string
  }
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

/**
 * Normaliza casos especiais do Traveler
 */
function normalizeTraveler(slug: string) {
  const match = slug.match(/^([a-z]+)-traveler-(boy|girl)$/)

  if (match) {
    return `traveler-${match[1]}`
  }

  return slug
}

/**
 * 🔹 Obrigatório para output: export
 */
export async function generateStaticParams() {
  const res = await fetch(
    'https://gi.yatta.moe/api/v2/pt/avatar',
    { cache: 'force-cache' }
  )

  const json = await res.json()
  const items: CharacterItems = json.data.items

  return Object.values(items).map((char) => ({
    id: normalizeTraveler(
      normalize(char.route || char.name)
    )
  }))
}

export default async function Page({ params }: Props) {
  const id = (await params).id;
  const slug = normalizeTraveler(normalize(id))

  const res = await fetch(
    'https://gi.yatta.moe/api/v2/pt/avatar',
    { cache: 'force-cache' }
  )

  const json = await res.json()
  const items: CharacterItems = json.data.items

  const character = Object.values(items).find((char) =>
    normalizeTraveler(normalize(char.route)) === slug ||
    normalizeTraveler(normalize(char.name)) === slug
  )

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