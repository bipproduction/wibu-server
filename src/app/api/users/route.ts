import prisma from "@/util/prisma"
export async function GET(req: Request) {
    const ussers = await prisma.user.findMany({
        where: {
            userRoleId: "user"
        }
    })
    return Response.json(ussers)
}