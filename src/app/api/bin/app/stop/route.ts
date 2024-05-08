import streamResponse from "@/bin/stream_response"

export async function POST(req: Request) {
    const body = await req.json()
    if (!body && !body.name) return new Response('Bad Request', { status: 400 })
    const stream = streamResponse({ cmd: 'pm2', list: ['stop', body.name], path: "./" })
    return stream
}