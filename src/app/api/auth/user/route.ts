import Crypto from 'crypto-js'
import prisma from '@/util/prisma'

export async function GET(req: Request) {

    // console.log("INI ADA DIMANA")
    const auth = req.headers.get('Authorization')
    const token = auth?.replace('Bearer ', '')

    if (!token) return new Response('Unauthorized', { status: 401 })

    const user_id = Crypto.AES.decrypt(token!, 'makuro').toString(Crypto.enc.Utf8)

    const user = await prisma.user.findUnique({
        where: {
            id: user_id,
        }
    })


    if (!user) return new Response('Unauthorized', { status: 401 })
    if (!user.isActive) return new Response('Unauthorized', { status: 401 })

    return Response.json({ token }, { status: 200 })
}