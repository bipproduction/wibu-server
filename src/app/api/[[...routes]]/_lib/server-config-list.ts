import { parseNginxToSubdomainJson } from "@/lib/nginx";
import fs from "fs/promises";

async function serverConfigList({domainId}: {domainId: string}) {
    const configPath = `/etc/nginx/conf.d/${domainId}.conf`;
    const config = await fs.readFile(configPath, "utf-8");
    const json = parseNginxToSubdomainJson(config);
    return json.subdomains
}

export default serverConfigList;