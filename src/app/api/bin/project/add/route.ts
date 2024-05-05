import streamResponse from "@/bin/stream_response"

export async function POST(req: Request) {

    const body = await req.json()
    if (!body && !body.url) return new Response('Bad Request', { status: 400 })
    console.log(body.url)
    const stream = streamResponse({ cmd: 'git', list: ['clone', body.url, body.name], name: "./" })
    return stream
}