import fs from 'fs'
const root_path = process.cwd()
import path from 'path'
import { spawn } from 'child_process'
import _ from 'lodash'
export const dynamic = 'force-dynamic'
export async function GET(req: Request, { params }: { params: { name: string } }) {


    const git_current_branch: string = await new Promise((resolve, reject) => {
        try {
            let log = ""
            const child = spawn('git', ['branch', '--show-current'], {
                cwd: path.join(root_path, './..', params.name)
            })
            child.stdout.on('data', (data) => {
                log += data.toString()
            })

            child.on('close', (code) => {
                resolve(log)
            })
        } catch (error) {
            resolve("null")
        }
    })

    const pkg: any = async () => {
        try {
            const p = await fs.promises.readFile(path.join(root_path, './..', params.name, 'package.json'), 'utf8')
            return JSON.parse(p)
        } catch (error) {
            return null
        }
    }

    const readme: string | null = await new Promise((resolve, reject) => {
        fs.readFile(path.join(root_path, './..', params.name, 'README.md'), 'utf8', (err, data) => {
            if (err) {
                resolve(null)
            } else {
                resolve(data)
            }
        })
    })

    const data_pkg = await pkg()
    const prisma = async () => {
        try {
            const p = await fs.promises.readFile(path.join(root_path, './..', params.name, 'prisma', 'schema.prisma'), 'utf8')
            return p
        } catch (error) {
            return null
        }
    }
    const data_prisma = await prisma()

    const remote_branch: string = await new Promise((resolve, reject) => {
        try {
            let log = ""
            const child = spawn('git', ['ls-remote', '--heads', 'origin'], {
                cwd: path.join(root_path, './..', params.name)
            })
            child.stdout.on('data', (data) => {
                log += data.toString()
            })

            child.on('close', (code) => {
                resolve(log)
            })
        } catch (error) {
            resolve("")
        }
    })

    const prisma_schema = await (async () => {
        try {
            return await fs.promises.readFile(path.join(root_path, './..', params.name, 'prisma', 'schema.prisma'), 'utf8')
        } catch (error) {
            return null
        }
    })()

    const env_text = await (async () => {
        try {
            return await fs.promises.readFile(path.join(root_path, './..', params.name, '.env'), 'utf8')
        } catch (error) {
            return null
        }
    })()


    const list_remote = remote_branch.split('\n').map((item) => item.trim().split("\t")[1]).filter((item) => item !== undefined).map((item) => item.replace('refs/heads/', ''))

    const data = {
        branch: git_current_branch.trim(),
        remote_branch: list_remote,
        app: (data_pkg && data_pkg.name != null) ? "true" : "false",
        type: (data_pkg === null) ? "none" : (data_pkg.scripts && data_pkg.scripts.start && data_pkg.scripts.start.includes("next")) ? "nextjs" : "node",
        prisma: (data_prisma === null) ? "false" : "true",
        seed: (data_pkg && data_pkg.prisma && data_pkg.prisma.seed) ? "true" : "false",
        package: _.omit(data_pkg, ['devDependencies', 'private', 'license', 'repository', 'author']),
        readme,
        prisma_schema,
        env_text
    }

    return Response.json(data)
}