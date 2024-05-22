import fs from 'fs'
import path from 'path'

export async function GET(req: Request, { params }: { params: { name: string } }) {

    if (!params.name) return new Response('Bad Request', { status: 400 })

    //? check if .env file exists
    const root = process.cwd()
    if (!fs.existsSync(path.join(root, './..', params.name, '.env'))) {
        return new Response('Not Found', { status: 404 })
    }

    const env_text = await (async () => {
        try {
            return await fs.promises.readFile(path.join(root, './..', params.name, '.env'), 'utf8')
        } catch (error) {
            return null
        }
    })()

    const regex = /DATABASE_URL="postgresql:\/\/(.*?):(.*?)@(.*?):(.*?)\/(.*?)\?schema=(.*?)"/;
    const match = env_text?.match(regex);

    if (!match) return new Response('Not Found', { status: 404 })

    const [_, user, password, host, port, database, schema] = match;
    const env = {
        user,
        password,
        host,
        port,
        database,
        schema
    }

    return Response.json({ data: env })
}