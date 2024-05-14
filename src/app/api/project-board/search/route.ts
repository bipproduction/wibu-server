import prisma from "@/util/prisma"

export async function GET(req: Request) {
    const name = new URL(req.url).searchParams.get('name')
    if (!name) return new Response('Bad Request', { status: 400 })

    const project = await prisma.projectBoard.findMany({
        where: {
            parentProject: name
        },
        select: {
            id: true,
            title: true
        }
    })

    return Response.json(project, { status: 200 })
}