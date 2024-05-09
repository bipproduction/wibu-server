import { spawn } from "child_process"

export async function POST(req: Request) {
    const body = await req.json()
    if (!body && !body.name) return new Response('Bad Request', { status: 400 })
    const stream = new ReadableStream({
        start(controll) {
            const child = spawn('/bin/bash', ['-c', `pm2 logs ${body.name}`])
            child.stdout.on("data", (data) => {
                controll.enqueue(data.toString())
            })

            child.stderr.on("data", (data) => {
                controll.enqueue(data.toString())
            })

            child.on("close", () => {
                controll.close()
            })

            setTimeout(() => {
                child.kill()
            }, 3000)
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