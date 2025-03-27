import fs from "fs/promises";
const UPLOAD_DIR = process.env.WIBU_UPLOAD_DIR;

async function configText(params: { name: string }) {
  try {
    const { name } = params;
    if (!UPLOAD_DIR) {
      return {
        status: 500,
        message: "WIBU_UPLOAD_DIR is not defined",
      };
    }
    if (!name) {
      return {
        status: 400,
        message: "Name is required",
      };
    }
    const config = await fs.readFile(
      `${UPLOAD_DIR}/config/${name}.yml`,
      "utf-8"
    );
    return {
      status: 200,
      message: "Success",
      data: config,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

export default configText;
