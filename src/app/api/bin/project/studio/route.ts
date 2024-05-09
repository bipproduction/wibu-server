import { spawn } from 'child_process'
import path from 'path'
export async function POST(req: Request) {
    const body: { [key: string]: any } = await req.json()

    if (!body.name || !body.port) return new Response("required", { status: 400 })
    const root_path = path.join(process.cwd(), '..', body.name)
    const stream = new ReadableStream({
        start(controll) {
            const child = spawn('/bin/bash', ['-c', `source .env && pm2 start "npx prisma studio --port ${body.port}" --name ${body.name}-studio_${body.port}`], {
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