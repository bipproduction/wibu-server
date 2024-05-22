export async function GET(req: Request, { params }: { params: { name: string } }) {
    const name = params.name
    if (!name) return new Response('Bad Request', { status: 400 })

    return Response.json({ params })
}