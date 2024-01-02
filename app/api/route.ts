export async function GET (req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  return Response.json({ boev: id })
}
