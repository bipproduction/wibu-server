import { MODEL_PM2 } from '@/model/MODEL_PM2'
import { spawn } from 'child_process'
import _ from 'lodash'

export const dynamic = 'force-dynamic'
export async function GET() {
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

    const list_data = list.map((item) => ({
        name: item.name,
        // pid: item.pid,
        status: item.pm2_env.status,
        memory: item.monit.memory,
        restart_time: item.pm2_env.restart_time,
        created_at: item.pm2_env.created_at,
        // PWD: item.pm2_env.PWD,
        PORT: item.pm2_env.PORT,
        unstable_restarts: item.pm2_env.unstable_restarts,
        DATABASE_URL: item.pm2_env.DATABASE_URL,
        NEXT_PRIVATE_WORKER: item.pm2_env.NEXT_PRIVATE_WORKER,
        NEXT_RUNTIME: item.pm2_env.NEXT_RUNTIME,
        NODE_ENV: item.pm2_env.NODE_ENV,
        npm_node_execpath: item.pm2_env.npm_node_execpath,
        npm_package_version: item.pm2_env.npm_package_version,
        npm_package_name: item.pm2_env.npm_package_name,
        USER: item.pm2_env.USER,
        exec_mode: item.pm2_env.exec_mode,
        pm_cwd: item.pm2_env.pm_cwd,
        // instances: item.pm2_env.instances,
        // cpu: item.monit.cpu
    }))
    
    return Response.json(_.orderBy(list_data, ['status'], ['asc']))
}