import { spawn } from 'child_process'
import path from 'path'
export async function POST(req: Request) {
    const { name } = await req.json()
    if (!name) return Response.json({ message: 'Missing name' })
    const root = path.join(process.cwd(), './../', name)
    try {
        const res = await new Promise((resolve, reject) => {
            let log = ""
            const child = spawn('/bin/bash', ['-c', 'rm -r node_modules && rm yarn.lock'], { cwd: root, })
            child.stdout?.on('data', (data) => log += data)
            child.stderr?.on('data', (data) => log += data)
            child.on('error', reject)
            child.on('close', () => resolve(log))
        })
        return Response.json({ data: res })
    } catch (error) {
        return Response.json({ error: true, message: error })
    }

}