import { spawn } from "child_process"
import _ from "lodash"
import path from "path"
import fs from "fs"


export async function GET(req: Request) {
    const formData = await req.formData()
    _save_image(formData)

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

const root_path = path.join(process.cwd(), 'assets/img')
export async function _save_image(formData: FormData) {
    try {
        const file = formData.get('image') as File
        const filePath = path.join(root_path, file.name )
        const b = await file.arrayBuffer()
        const buffer = Buffer.from(b as any, 'utf-8')
        await fs.promises.writeFile(filePath, buffer)
        console.log("image saved")
        return true
    } catch (error) {
        console.error("Error saving image:", error);
        return false
    }

}