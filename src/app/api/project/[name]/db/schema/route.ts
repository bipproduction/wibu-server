import fs from 'fs'
import path from 'path'
import readdirp from 'readdirp'
export async function GET(req: Request, { params }: { params: { name: string } }) {
    // const { name } = params
    // if (!name) return new Response('Bad Request', { status: 400 })
    // const root = process.cwd()
    // const prisma_schema = await (async () => {
    //     try {
    //         const text = await fs.promises.readFile(path.join(root, './..', params.name, 'prisma', 'schema.prisma'), 'utf8')
    //         return text
    //     } catch (error) {
    //         return null
    //     }
    // })()
    // console.log(process.cwd())


    return Response.json("list")
}


