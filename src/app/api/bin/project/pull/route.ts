import streamResponse from '@/bin/stream_response'
import { exec, spawn } from 'child_process'
import path from 'path'
const root_path = process.cwd()
export async function POST(req: Request, res: Response) {
    const body = await req.json()
    if (!body && !body.name || !body.branch) return new Response('Bad Request', { status: 400 })

    const root_path = path.join(process.cwd(), './../', body.name)
    const child = exec(`cd ${root_path} && git stash && git pull origin ${body.branch}`);
    const tream = new ReadableStream({
        start(controller) {

            child?.stdout?.on('data', (data) => {
                // Push data into the stream
                controller.enqueue(data);
            });

            child?.stderr?.on('data', (data) => {
                // Push data into the stream
                controller.enqueue(data);
            })

            child?.on('close', () => {
                // Close the stream
                controller.close();
            })

        }
    })

    return new Response(tream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Transfer-Encoding': 'chunked'
        }
    })
}