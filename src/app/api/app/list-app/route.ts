import { MODEL_PM2 } from '@/model/MODEL_PM2'
import { spawn } from 'child_process'
import _ from 'lodash'

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
        instances: item.pm2_env.instances,
        cpu: item.monit.cpu
    }))
    
    return Response.json(_.orderBy(list_data, ['status'], ['asc']))
}