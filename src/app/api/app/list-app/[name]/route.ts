import { MODEL_PM2 } from '@/model/MODEL_PM2'
import { spawn } from 'child_process'
import _ from 'lodash'
export async function GET(req: Request, { params }: { params: { name: string } }) {
    if (!params.name) return new Response('Bad Request', { status: 400 })
    const pm2List: any[] = await new Promise((resolve, reject) => {
        try {
            const child = spawn('pm2', ['jlist'])
            let log = ""
            child.stdout.on('data', (data) => {
                log += data.toString()
            })

            child.stderr.on('data', (data) => {
                log += data.toString()
            })

            child.on('close', (code) => {
                resolve(JSON.parse(log))
            })
        } catch (error) {
            resolve([])
        }
    })

    const app: MODEL_PM2 = pm2List.find((item) => item.name === params.name)
    const result = {
        name: app.name,
        pid: app.pid,
        status: app.pm2_env.status,
        pm_uptime: app.pm2_env.pm_uptime,
        restart_time: app.pm2_env.restart_time,
        unstable_restarts: app.pm2_env.unstable_restarts,
        pm_id: app.pm_id,
        monit: app.monit,
        args: app.pm2_env.args,
        instance: app.pm2_env.instances,
        kill_retry_time : app.pm2_env.kill_retry_time,
        exec_mode: app.pm2_env.exec_mode,
        unique_id: app.pm2_env.unique_id,
    }
    // pid, name, monit, pm_id,  pm2_env > kill_retry_time , username , env > args , name, exec_mode, instances, NODE_APP_INSTANCE, LANG , unique_id, status, pm_uptime, pm_id, restart_time, unstable_restarts, exit_code 
    return Response.json(result)
}