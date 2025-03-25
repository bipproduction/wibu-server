import fs from "fs/promises";

async function getVersion() {
  const version = await fs.readFile("package.json", "utf-8");
  return JSON.parse(version).version;
}

export default getVersion;