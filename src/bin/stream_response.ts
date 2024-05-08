import { spawn } from 'child_process'
const root_path = process.cwd()
import path from 'path'
const streamResponse = ({ cmd, list, path: name }: { cmd: string, list: string[], path: string }) => {
    const cwd = path.join(root_path, '..', name)
    console.log(cwd)
    const stream = new ReadableStream({
        start(controller) {
            try {
                const child = spawn(cmd, list, {
                    cwd: `./../${name}`
                });
                // Handle stdout data from the child process
                child.stdout.on('data', (data) => {
                    // Push data into the stream
                    controller.enqueue(data);
                });

                child.stderr.on('data', (data) => {
                    // Push data into the stream
                    controller.enqueue(data);
                })
                // Handle the end of the child process
                child.on('close', () => {
                    // Close the stream
                    controller.close();
                });
            } catch (error) {
                const child = spawn('echo', [`"${error}"`], {
                    cwd: path.join(root_path, './..', name)
                });
                // Handle stdout data from the child process
                child.stdout.on('data', (data) => {
                    // Push data into the stream
                    controller.enqueue(data);
                });

                child.stderr.on('data', (data) => {
                    // Push data into the stream
                    controller.enqueue(data);
                })
                // Handle the end of the child process
                child.on('close', () => {
                    // Close the stream
                    controller.close();
                });
            }
        }
    });

    return new Response(stream, {
        status: 200, headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Transfer-Encoding': 'chunked'
        }
    })
}

export default streamResponse