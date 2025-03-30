/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateNginxFromSubdomain } from "@/lib/nginx";
import fs from "fs/promises";
import serverConfigList from "../server-config-list";

async function serverRemove({ body }: { body: { name: string; data: Record<string, unknown> } }) {
  const { name, data } = body;

  const config = await serverConfigList({ domainId: name });
  const newData = config?.filter((item: any) => item.id !== data.id);
  const serverString = generateNginxFromSubdomain({ subdomains: newData });
  await fs.writeFile(`/etc/nginx/conf.d/${name}.conf`, serverString);
  return {
    message: "Server removed successfully",
  };
}

export default serverRemove;