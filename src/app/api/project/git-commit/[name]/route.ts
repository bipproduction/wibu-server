import { spawn } from 'child_process'
import path from 'path'
export async function GET(req: Request, {params}: {params: {name: string}}) {
    // const body = await req.json()
    // console.log(body)
    // if (!body && !body.name || !body.branch) return new Response('Bad Request', { status: 400 })

    // try {
    let result = []
    const res = await gitLogToJson(params)
    const list = res.split("---")
    for (const item of list) {
        if (item) {
            result.push(JSON.parse(item))
        }
    }

    // console.log(res)
    //     if (res) return new Response(JSON.stringify(res), { status: 200 })
    // } catch (error) {
    //     return new Response(JSON.stringify([]), { status: 200 })
    // }

    return new Response(JSON.stringify(result), { status: 200 })
}

async function gitLogToJson(params: any): Promise<string> {

    return await new Promise((resolve, reject) => {
        try {
            const root_path = path.join(process.cwd(), './../', params.name)
            // const gt = `git log --pretty=format:'{%n  "commit": "%h",%n ,%n  "subject": "%s",%n  "committer": "%an",%n  "date": "%cr"%n},' --abbrev-commit`
            const gt = `git log --pretty=format:'{"commit":"%h","subject":"%s","committer":"%an","date":"%cr"}---' --abbrev-commit`
            const gitLog = spawn('/bin/bash', ['-c', 'source .env && git fetch origin && ' + gt], {
                cwd: root_path,
                env: {
                    ...process.env,
                    NODE_ENV: 'production'
                }
            });

            let gitLogOutput = '';

            gitLog.stdout.on('data', (data) => {
                gitLogOutput += data.toString();
            });

            gitLog.on('close', (code) => {
                resolve(gitLogOutput);
            });
        } catch (error) {
            console.log(error)
            resolve("[]")
        }
    });
}
