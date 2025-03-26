/* eslint-disable @typescript-eslint/no-explicit-any */

import { generateNginxFromSubdomain } from "@/lib/nginx";
import fs from "fs/promises";

async function editServer(name: string, data: any) {
  const serverString = generateNginxFromSubdomain({ subdomains: data });
  await fs.writeFile(`/etc/nginx/conf.d/${name}.conf`, serverString);
  return {
    message: "Server updated successfully",
  };
}

export default editServer;
