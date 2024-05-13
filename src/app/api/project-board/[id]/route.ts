import prisma from "@/util/prisma"

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const res = await prisma.projectBoard.findUnique({
        where: {
            id: params.id
        }
    })

    return new Response(JSON.stringify(res), { status: 200 })
}