import { MODEL_PM2 } from '@/model/MODEL_PM2'
import { spawn } from 'child_process'
import _ from 'lodash'
import fs from 'fs'

export const dynamic = 'force-dynamic'
export async function GET(req: Request) {

    const list: MODEL_PM2[] = await new Promise((resolve, reject) => {
        let log = ""
        const child = spawn('pm2', ['jlist'])
        child.stdout.on('data', (data) => {
            log += data.toString()
        })

        child.stderr.on('data', (data) => {
            log += data.toString()
        })

        child.on('close', (code) => {
            resolve(JSON.parse(log))
        })

    })

    const list_server = await fs.promises.readdir('/etc/nginx/sites-enabled')
    let list_server_name: any[] = []
    for (let file_name of list_server.filter((item) => item.includes('_'))) {
        const text = await fs.promises.readFile(`/etc/nginx/sites-enabled/${file_name}`, 'utf8')
        const regexPattern = /server_name\s+([^;]+)/g;
        const serverNames = [];
        let match_server;
        while ((match_server = regexPattern.exec(text)) !== null) {
            serverNames.push(match_server[1].trim());
        }
        const data_server = {
            name: file_name,
            server_name: serverNames[0]
        }

        list_server_name.push(data_server)
    }

    // console.log(list_server_name)

    const list_data = list.map((item) => ({
        name: item.name,
        server_name: _.startsWith(item.name.split('_')[1], '5') ? `${req.url}:${item.name.split('_')[1]}` : list_server_name.find((itm) => itm.name == item.name)?.server_name ?? "none",
        port: item.name.split('_')[1],
        // pid: item.pid,
        status: item.pm2_env.status,
        memory: item.monit.memory,
        restart_time: item.pm2_env.restart_time,
        created_at: item.pm2_env.created_at,
        // PWD: item.pm2_env.PWD,
        // PORT: item.pm2_env.PORT,
        unstable_restarts: item.pm2_env.unstable_restarts,
        DATABASE_URL: item.pm2_env.DATABASE_URL,
        NEXT_PRIVATE_WORKER: item.pm2_env.NEXT_PRIVATE_WORKER,
        // NEXT_RUNTIME: item.pm2_env.NEXT_RUNTIME,
        NODE_ENV: item.pm2_env.NODE_ENV,
        npm_node_execpath: item.pm2_env.npm_node_execpath,
        npm_package_version: item.pm2_env.npm_package_version,
        // npm_package_name: item.pm2_env.npm_package_name,
        // USER: item.pm2_env.USER,
        // exec_mode: item.pm2_env.exec_mode,
        pm_cwd: item.pm2_env.pm_cwd,
        // instances: item.pm2_env.instances,
        // cpu: item.monit.cpu
    }))

    return Response.json(_.orderBy(list_data, ['status'], ['asc']))
}