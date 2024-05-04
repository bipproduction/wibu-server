import { spawn } from "child_process"

export async function GET(req: Request, res: Response) {
    const port = new URL(req.url).searchParams.get('port')

    const list_app: any[] = await new Promise((resolve, reject) => {
        try {
            let log = ""
            const child = spawn('pm2', ['jlist'])
            child.stdout.on('data', (data) => {
                log += data.toString()
            })

            child.stderr.on('data', (data) => {
                log += data.toString()
            })

            child.on('close', (code) => {
                resolve(JSON.parse(log))
            })
        } catch (error) {
            resolve([])
        }
    })

    const available = list_app.filter((item) => item.name.split('_').includes(port)).length > 0

    return Response.json({ available })

}