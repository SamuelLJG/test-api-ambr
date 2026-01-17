let data = await fetch('https://gi.yatta.moe/api/v2/pt/avatar/10000045?vh=63F3')

export async function generateStaticParams() {
  return data
}

export default async function Page() {
  
  let character = await data.json()
  
  return (
    <ul>
        <li key={character.data.id}>{character.data.fetter.title}</li>
    </ul>
  )
}