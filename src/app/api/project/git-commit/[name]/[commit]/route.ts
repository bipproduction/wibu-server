import { spawn } from 'child_process'
import path from 'path'
export async function GET(req: Request, { params }: { params: { name: string, commit: string } }) {
    const { commit, name } = params
    if (!commit || !name) return new Response('Bad Request', { status: 400 })

    const root = path.join(process.cwd(), './../', name)
    const res = await new Promise((resolve, reject) => {
        let log = ""
        const child = spawn('/bin/bash', ['-c', `git show ${commit}`], { cwd: root, })
        child.stdout?.on('data', (data) => log += data.toString('utf8'))
        child.stderr?.on('data', (data) => log += data.toString('utf8'))
        child.on('error', reject)
        child.on('close', () => resolve(log))
    })

    return Response.json({ data: res })
}