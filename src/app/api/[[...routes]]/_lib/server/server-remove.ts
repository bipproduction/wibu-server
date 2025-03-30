/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateNginxFromSubdomain } from "@/lib/nginx";
import fs from "fs/promises";
import serverConfigList from "../server-config-list";
import { exec } from "child_process";
import { promisify } from "util";
const EX = promisify(exec);

async function serverRemove({
  body,
}: {
  body: { name: string; data: Record<string, unknown> };
}) {
  const { name, data } = body;

  try {
    const config = await serverConfigList({ domainId: name });
    const newData = config?.filter((item: any) => item.id !== data.id);
    const serverString = generateNginxFromSubdomain({ subdomains: newData });
    await fs.writeFile(`/etc/nginx/conf.d/${name}.conf`, serverString);

    await EX("nginx -s reload");
    return {
      message: "Server removed successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Server removed failed",
    };
  }
}

export default serverRemove;
