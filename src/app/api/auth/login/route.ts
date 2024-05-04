import prisma from "@/util/prisma"
import CryptoJS from "crypto-js"
import { cookies } from 'next/headers'
export async function POST(req: Request) {
    const body = await req.json()

    if (!body.email || !body.password) return new Response('Email dan Password harus diisi', { status: 400 })

    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })

    if (!user) return new Response('User tidak ditemukan', { status: 400 })
    if (user.password !== body.password) return new Response('Password salah', { status: 400 })

    const token = CryptoJS.AES.encrypt(user.id, 'makuro').toString()

    cookies().set('token', token)

    return Response.json({ token }, { status: 200 })
}