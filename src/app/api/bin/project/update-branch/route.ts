import streamResponse from "@/bin/stream_response"
import { execSync } from "child_process"

export async function POST(req: Request) {
    const body = await req.json()
    if (!body && !body.name || !body.branch) return new Response('Bad Request', { status: 400 })
    console.log(body.branch)
    execSync(`git stash && git fetch --all && git checkout ${body.branch}`, { cwd: `./../${body.name}` })
    const stream = streamResponse({ cmd: 'echo', list: [`"success ${body.branch}"`], path: body.name })
    return stream
}