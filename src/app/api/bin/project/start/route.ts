import streamResponse from "@/bin/stream_response"

export async function POST(req: Request, res: Response) {
    const body = await req.json()
    if (!body && !body.name) return new Response('Bad Request', { status: 400 })
    const stream = streamResponse({ cmd: 'pm2', list: ['start', `\"yarn start --port ${body.port}\"`, '--name', `${body.name}_${body.port}`], path: body.name })
    return stream
}