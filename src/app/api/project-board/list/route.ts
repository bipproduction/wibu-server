import prisma from "@/util/prisma"

export const dynamic = 'force-dynamic'
export async function GET() {
    const data = await prisma.projectBoard.findMany({
        orderBy: {
            parentProject: "asc"
        }
    })
    return new Response(JSON.stringify(data), { status: 200 })
}