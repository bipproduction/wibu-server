import streamResponse from "@/bin/stream_response"
import { exec, execSync, spawn } from "child_process"

export async function POST(req: Request, res: Response) {
    const body = await req.json()
    if (!body && !body.name) return new Response('Bad Request', { status: 400 })

    const stream = streamResponse({ cmd: 'yarn', list: ['build'], path: body.name })

    return stream
    // console.log(strm.toString())


    // const stream = new ReadableStream({
    //     start(controller) {
    //         try {
    //             const child = spawn('yarn', ['build'], {
    //                 cwd: `./../${body.name}`
    //             });
    //             // Handle stdout data from the child process
    //             child.stdout.on('data', (data) => {
    //                 // Push data into the stream
    //                 controller.enqueue(data+'\n');
    //             });

    //             child.stderr.on('data', (data) => {
    //                 // Push data into the stream
    //                 controller.enqueue(data);
    //             })
    //             // Handle the end of the child process
    //             child.on('close', () => {
    //                 // Close the stream
    //                 controller.close();
    //             })
    //         } catch (error) {

    //             const child = spawn('echo', [`"${error}"`], {
    //                 cwd: `./../${body.name}`
    //             });
    //             // Handle stdout data from the child process
    //             child.stdout.on('data', (data) => {
    //                 // Push data into the stream
    //                 controller.enqueue(data);
    //             });
    //         }
    //     }

    // })



    // return new Response(stream, {
    //     headers: {
    //         'Content-Type': 'text/event-stream',
    //         'Cache-Control': 'no-cache',
    //         'Connection': 'keep-alive',
    //         'Transfer-Encoding': 'chunked'
    //     }
    // })
}