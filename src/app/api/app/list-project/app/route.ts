import { MODEL_PM2 } from "@/model/MODEL_PM2"
import { spawn } from "child_process"
import 'colors'

interface BODY {
    name: string
}
export async function POST(req: Request) {
    const body = await req.json() as BODY
    if (!body.name) return new Response('Bad Request', { status: 400 })

    const child = spawn('/bin/bash', ['-c', 'pm2 jlist'])
    const list_string: MODEL_PM2[] = await (async () => {
        let log = ""
        return await new Promise((resolve, reject) => {
            try {
                child.stdout.on('data', (data) => {
                    log += data.toString()
                })

                child.on('close', (code) => {
                    try {
                        resolve(JSON.parse(log))
                    } catch (error) {
                        resolve([])
                    }
                })
            } catch (error) {
                resolve([])
            }
        })
    })()

    const app = list_string.filter((item) => item.name.includes(body.name)).map((item) => ({
        id: item.name,
        name: item.name.split('_')[0],
        port: item.name.split('_')[1],
        status: item.pm2_env.status,
    }))

    return Response.json(app)
}