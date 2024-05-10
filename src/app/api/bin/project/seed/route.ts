import streamResponse from "@/bin/stream_response"
import { spawn } from 'child_process'
import path from "path"

export async function POST(req: Request) {
    const body = await req.json()
    if (!body && !body.name) return new Response('Bad Request', { status: 400 })
    // const stream = streamResponse({ cmd: 'npx', list: ['prisma', 'db', 'seed'], path: body.name })
    const root_path = path.join(process.cwd(), '..', body.name)
    const child = spawn('/bin/bash', ['-c', `source .env && npx prisma db seed`], {
        cwd: root_path,
        env: {
            ...process.env,
            NODE_ENV: 'production',
        }
    })
    const stream = new ReadableStream({
        start(controll) {
            child.stdout.on("data", (data) => {
                controll.enqueue(data.toString())
            })

            child.stderr.on("data", (data) => {
                controll.enqueue(data.toString())
            })

            child.on("close", () => {
                controll.close()
            })
        }
    })
    return stream
}