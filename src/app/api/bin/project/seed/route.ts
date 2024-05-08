import streamResponse from "@/bin/stream_response"

export async function POST(req: Request) {
    const body = await req.json()
    if (!body && !body.name) return new Response('Bad Request', { status: 400 })
    const stream = streamResponse({ cmd: 'npx', list: ['prisma', 'db', 'seed'], path: body.name })
    return stream
}