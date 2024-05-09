import { spawn } from "child_process"
import _ from "lodash"

export async function GET(req: Request) {
    const name = new URL(req.url).searchParams.get('name')
    if (!name) return new Response('Bad Request', { status: 400 })

    const list_app: any[] = await new Promise((resolve, reject) => {
        try {
            let log = ""
            const child = spawn('pm2', ['jlist'])
            child.stdout.on('data', (data) => {
                log += data.toString()
            })

            child.stderr.on('data', (data) => {
                log = "[]"
            })

            child.on('close', (code) => {
                resolve(JSON.parse(log))
            })

        } catch (error) {
            resolve([])
        }
    })

    const result = list_app.filter((item) => item.name.includes(name)).map((item) => ({
        name: item.name,
        port: item.name.split('_')[1],
    }))

    return Response.json(result)
}