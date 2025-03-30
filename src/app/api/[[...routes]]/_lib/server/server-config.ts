import { parseNginxToSubdomainJson } from "@/lib/nginx";
import fs from "fs/promises";

async function serverConfig() {
  try {
    const wibudevPath = "/etc/nginx/conf.d/wibudev.conf";
  const mukuPath = "/etc/nginx/conf.d/muku.conf";

  const wibudevConfig = await fs.readFile(wibudevPath, "utf-8");
  const mukuConfig = await fs.readFile(mukuPath, "utf-8");

  const wibuDevJson = parseNginxToSubdomainJson(wibudevConfig);
  const mukuJson = parseNginxToSubdomainJson(mukuConfig);

  return {
    data: {
      wibuDev: wibuDevJson.subdomains,
      muku: mukuJson.subdomains,
    },
  };
  } catch (error) {
    console.error(error);
    return {
      data: {
        wibuDev: [],
        muku: [],
      },
    };
  }
}

export default serverConfig;
