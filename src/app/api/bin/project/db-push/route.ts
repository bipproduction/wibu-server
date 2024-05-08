import streamResponse from "@/bin/stream_response";
import { exec, execSync, spawn } from "child_process";
import path from "path";


export async function POST(req: Request, res: Response) {
    const body = await req.json()
    if (!body && !body.name) return new Response('Bad Request', { status: 400 })
    const root_path = path.join(process.cwd(), '..', body.name)
    const child = spawn("/bin/bash",["-c", "source .env && npx prisma db push"], {
        cwd: root_path,
        env: {
            ...process.env,
            NODE_ENV: 'production',
        }
    });
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