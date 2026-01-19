import Image from "next/image"

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

  return <>
    <main className="animate-fadein">
      <section className="grid grid-cols-2 h-130 m-auto w-286 border-[#0066FF] border-2 rounded-[20px] relative  overflow-x-clip ">
        <div className="absolute top-2 left-2 bg-pink-500 rounded-xl p-2">
          <Image width={20} height={20} src="/share-sharing-icon-29.png" className="invert-100 fill-green-700" alt=""/>
        </div>
        <div className="absolute bg-linear-to-r from-[#3E8BFF] to-[#0066FF] w-full h-52.5 top-16.5 p-6 font-extrabold">
          <span className="test font-medium text-3xl text-[#CEE1FF] bg-linear-to-tl from-[#FFCC00] to-[#FFEA97] bg-clip-text text-transparent">希格雯</span>
          <h1 className="text-[3.2em] leading-10 text-[#CEE1FF] bg-linear-to-t from-[#CEE1FF] to-[#FFF] bg-clip-text text-transparent">SIGEWINNE</h1>
        </div>
        <Image
        fetchPriority="high"
        loading={"lazy"}
        className="absolute w-226.5 bottom-0 -right-23 animate-translate"
        width={1354} height={830} src={'https://fastcdn.hoyoverse.com/content-v2/hk4e/124105/22609467819303b436883092635ae97a_5002591570143526700.png'} alt=""/>
      </section>
    </main>
  </>
}