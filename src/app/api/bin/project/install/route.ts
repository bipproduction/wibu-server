import streamResponse from "@/bin/stream_response"

export async function POST(req: Request, res: Response) {
    const body = await req.json()
    if (!body && !body.name ) return new Response('Bad Request', { status: 400 })

    const stream = streamResponse({ cmd: 'yarn', list: ['install'], name: body.name })
    return stream
}