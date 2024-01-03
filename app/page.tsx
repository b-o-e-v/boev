import prisma from "./lib/prisma"

export default async function Home() {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: { author: { select: { name: true } } }
  })

  return (
    <main>
      {(feed || []).map(({ id, title }) => <div key={id}>{ title }</div>)}
    </main>
  )
}
