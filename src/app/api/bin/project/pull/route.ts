import streamResponse from '@/bin/stream_response'
import { spawn } from 'child_process'
import path from 'path'
const root_path = process.cwd()
export async function POST(req: Request, res: Response) {
    const body = await req.json()
    if (!body && !body.name || !body.branch) return new Response('Bad Request', { status: 400 })

    const stream = streamResponse({ cmd: 'git', list: ['pull', 'origin', body.branch], name: body.name })

    return stream

    // const stream = new ReadableStream({
    //     start(controller) {
    //         const child = spawn('git', ['pull', 'origin', body.branch], {
    //             cwd: path.join(root_path, './..', body.name)
    //         });
    //         // Handle stdout data from the child process
    //         child.stdout.on('data', (data) => {
    //             // Push data into the stream
    //             controller.enqueue(data);
    //         });

    //         child.stderr.on('data', (data) => {
    //             // Push data into the stream
    //             controller.enqueue(data);
    //         })
    //         // Handle the end of the child process
    //         child.on('close', () => {
    //             // Close the stream
    //             controller.close();
    //         });
    //     }
    // });

    // return new Response(stream, {
    //     status: 200, headers: {
    //         'Content-Type': 'text/event-stream',
    //         'Cache-Control': 'no-cache',
    //         'Connection': 'keep-alive',
    //         'Transfer-Encoding': 'chunked'
    //     }
    // })
}