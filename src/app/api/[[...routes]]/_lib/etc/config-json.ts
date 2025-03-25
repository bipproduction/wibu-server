import fs from "fs/promises";
import yml from "yaml";
const UPLOAD_DIR = process.env.WIBU_UPLOAD_DIR;

async function configJson(params: { name: string }) {
  try {
    const { name } = params;
  if (!UPLOAD_DIR) {
    return {
      status: 500,
      body: {
        message: "WIBU_UPLOAD_DIR is not defined",
      },
    };
  }
  if (!name) {
    return {
      status: 400,
      body: {
        message: "Name is required",
      },
    };
  }
  const config = await fs.readFile(`${UPLOAD_DIR}/config/${name}.yml`, "utf-8");
  return yml.parse(config);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default configJson;
