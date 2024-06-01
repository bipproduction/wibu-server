import prisma from "@/util/prisma"
import 'colors'
// (page - 1) * itemLoad
export async function GET(req: Request) {
    const take = +(new URL(req.url).searchParams.get('take') || 10)
    const skip = +(new URL(req.url).searchParams.get('skip') || 0)
    
    const data = await prisma.testScroll.findMany({
        take,
        skip
    })
    console.log(take, skip, "halo disini kawan ======>".red)
    return Response.json(data)
}