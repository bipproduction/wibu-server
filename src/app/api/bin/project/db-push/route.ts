import streamResponse from "@/bin/stream_response";
import { exec, execSync, spawn } from "child_process";

export async function POST(req: Request, res: Response) {
    const body = await req.json()
    if (!body && !body.name ) return new Response('Bad Request', { status: 400 })
    // console.log(body.name)
    // const stream = streamResponse({ cmd: 'prisma', list: ['db', 'push'], path: body.name })
    // return stream
    const tream = new ReadableStream({
        start(controller) {
           const child = exec(`wibu cmd -c "cd ../${body.name} && prisma db push"`);

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