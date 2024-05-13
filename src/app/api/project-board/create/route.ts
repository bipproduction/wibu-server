import prisma from "@/util/prisma"

export async function POST(req: Request) {
    const body = await req.json()
    if (!body && !body.title) return new Response('Bad Request', { status: 400 })

    try {
        await prisma.projectBoard.create({
            data: body
        })

        return new Response('Success', { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response('Bad Request', { status: 400 })
    }
}