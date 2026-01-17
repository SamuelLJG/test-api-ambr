 
 type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return [
    { id: '10000045' }
  ]
}

export default async function Page({
  params,
}: Props) {
   const id = (await params).id;
  const res = await fetch(
    `https://gi.yatta.moe/api/v2/pt/avatar/${id}?vh=63F3`,
    { cache: 'force-cache' }
  )

  const character = await res.json()
  return (
    <ul>
      <li>{character.data.fetter.title}</li>
    </ul>
  )
}