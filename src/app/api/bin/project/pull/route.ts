import streamResponse from '@/bin/stream_response'
import { spawn } from 'child_process'
import path from 'path'
const root_path = process.cwd()
export async function POST(req: Request, res: Response) {
    const body = await req.json()
    if (!body && !body.name || !body.branch) return new Response('Bad Request', { status: 400 })

    const stream = streamResponse({ cmd: 'git', list: ['pull', 'origin', body.branch], name: body.name })

    return stream
}