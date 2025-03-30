/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateNginxFromSubdomain } from "@/lib/nginx";
import fs from "fs/promises";
import serverConfigList from "../server-config-list";
import _ from "lodash";

async function serverAdd({
  body,
}: {
  body: {
    name: string;
    data: {
      id: string;
      domainId: string;
      name: string;
      ports: number[];
    };
  };
}) {
  const { name, data } = body;
  data.id = _.kebabCase(data.name);
  data.name = _.kebabCase(data.name);

  if (!data.ports || data.ports.length < 1) {
    return {
      message: "Ports is required",
    };
  }

  if (!data.name || data.name.length < 1) {
    return {
      message: "Name is required",
    };
  }

  const config = await serverConfigList({ domainId: name });
  const newData = [...config, data];
  const serverString = generateNginxFromSubdomain({ subdomains: newData });
  await fs.writeFile(`/etc/nginx/conf.d/${name}.conf`, serverString);
  console.log(serverString);
  return {
    message: "Server added successfully",
  };
}

export default serverAdd;
