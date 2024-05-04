import fs from 'fs'
import _ from 'lodash'
import path from 'path'
export async function GET(req: Request) {
    const list_server = await fs.promises.readdir(path.join('/etc', 'nginx', 'sites-enabled'))
    const list_data: any[] = []

    for (let ls of list_server.filter((item) => item.includes('_'))) {
        const text = await fs.promises.readFile(`/etc/nginx/sites-enabled/${ls}`, "utf-8")

        const regexPattern = /server_name\s+([^;]+)/g;
        const serverNames = [];
        let match_server;
        while ((match_server = regexPattern.exec(text)) !== null) {
            serverNames.push(match_server[1].trim());
        }

        const sslListenRegex = /listen\s+443\s+ssl;/;
        const hasSSLListen = sslListenRegex.test(text);

        const proxyPassLine = _.find(text.split('\n'), line => _.includes(line, 'proxy_pass'))?.trim().split('proxy_pass')[1].trim();

        const data = {
            id: ls,
            name: ls.split('_')[0],
            port: ls.split('_')[1],
            server_name: serverNames[0],
            ssl: hasSSLListen,
            proxy_pass: proxyPassLine,
        }

        list_data.push(data)
    }


    return Response.json(_.orderBy(list_data, ['port'], ['asc']))
}