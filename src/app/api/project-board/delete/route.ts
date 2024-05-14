import prisma from "@/util/prisma"

export async function POST(req: Request) {
    const body = await req.json()
    if (!body && !body.id) return new Response('Bad Request', { status: 400 })
    const res = await prisma.projectBoard.delete({
        where: {
            id: body.id
        }
    })

    return new Response('Success', { status: 200 })
}