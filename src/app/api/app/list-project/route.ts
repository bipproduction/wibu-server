import fs from 'fs'
const root_path = process.cwd()
import path from 'path'
import { spawn } from 'child_process'
import _ from 'lodash'

export const dynamic = 'force-dynamic'
export async function GET() {
    let list_result = []
    const list = await fs.promises.readdir(path.join(root_path, './..'))
    const list_data = list.filter((item) => !item.includes('.DS_Store'))

    for (let ls of list_data) {
        const git_current_branch: string = await new Promise((resolve, reject) => {
            let log = ""
            const child = spawn('git', ['branch', '--show-current'])
            child.stdout.on('data', (data) => {
                log += data.toString()
            })

            child.stderr.on('data', (data) => {
                log += data.toString()
            })

            child.on('close', (code) => {
                resolve(log)
            })
        })

        const pkg: any = async () => {
            try {
                const p = await fs.promises.readFile(path.join(root_path, './..', ls, 'package.json'), 'utf8')
                return JSON.parse(p)
            } catch (error) {
                return null
            }
        }

        const prisma = async () => {
            try {
                const p = await fs.promises.readFile(path.join(root_path, './..', ls, 'prisma', 'schema.prisma'), 'utf8')
                return p
            } catch (error) {
                return null
            }
        }

        const data_pkg = await pkg()
        const data_prisma = await prisma()
        // devDependencies
        const data = {
            name: ls,
            branch: git_current_branch.trim(),
            app: (data_pkg && data_pkg.name != null) ? "true" : "false",
            type: (data_pkg === null) ? "none" : (data_pkg.scripts && data_pkg.scripts.start && data_pkg.scripts.start.includes("next")) ? "nextjs" : "node",
            prisma: (data_prisma === null) ? "false" : "true",
            seed: (data_pkg && data_pkg.prisma && data_pkg.prisma.seed) ? "true" : "false",
            // package: _.omit(data_pkg, ['devDependencies', 'private', 'license', 'repository', 'author']),
        }

        list_result.push(data)
    }

    return Response.json(_.orderBy(list_result, ['type'], ['asc']))
}   