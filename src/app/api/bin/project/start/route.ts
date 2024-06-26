import streamResponse from "@/bin/stream_response"
import { spawn } from "child_process"
import path from "path"

export async function POST(req: Request, res: Response) {
    const body = await req.json()
    if (!body && !body.name) return new Response('Bad Request', { status: 400 })
    // const stream = streamResponse({ cmd: 'pm2', list: ['start', `\"yarn start --port ${body.port}\"`, '--name', `${body.name}_${body.port}`], path: body.name })
    // return stream
    const root_path = path.join(process.cwd(), '..', body.name)
    const stream = new ReadableStream({
        start(controll) {
            const child = spawn('/bin/bash', ['-c', `source .env && pm2 start "yarn start --port ${body.port}" --name ${body.name}_${body.port}`], {
                cwd: root_path,
                env: {
                    ...process.env,
                    NODE_ENV: 'production',
                }
            })

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

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Transfer-Encoding': 'chunked'
        }
    })
}