import fs from "fs/promises";

const UPLOAD_DIR = process.env.WIBU_UPLOAD_DIR;

async function configList() {
  const files: string[] = await fs.readdir(`${UPLOAD_DIR}/config`);
  return files.map((file) => ({
    name: file.replace(".yml", ""),
  }));
}

export default configList;