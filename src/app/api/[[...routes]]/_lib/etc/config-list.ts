import fs from "fs/promises";

const UPLOAD_DIR = process.env.WIBU_UPLOAD_DIR;

async function configList() {
  try {
    const files: string[] = await fs.readdir(`${UPLOAD_DIR}/config`);
    const data = files.map((file) => ({
      name: file.replace(".yml", ""),
    }));
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default configList;
