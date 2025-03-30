/* eslint-disable @typescript-eslint/no-explicit-any */

import { generateNginxFromSubdomain } from "@/lib/nginx";
import fs from "fs/promises";
import serverConfigList from "../server-config-list";
import _ from "lodash";

async function serverEdit({
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
  const config = await serverConfigList({ domainId: name });

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

  if(!config) {
    return {
      message: "Server not found",
    };
  }
  const newData = config?.map((item: any) => {
    if (item.id === data.id) {
      data.id = _.kebabCase(data.name);
      data.name = _.kebabCase(data.name);
      return data;
    }
    return item;
  });

  const serverString = generateNginxFromSubdomain({ subdomains: newData });
  await fs.writeFile(`/etc/nginx/conf.d/${name}.conf`, serverString);
  return {
    message: "Server added successfully",
  };
}

export default serverEdit;
