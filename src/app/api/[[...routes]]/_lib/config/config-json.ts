import fs from "fs/promises";
import yml from "yaml";
const UPLOAD_DIR = process.env.WIBU_UPLOAD_DIR;

async function configJson({ params }: { params: { name: string } }) {
  try {
    const { name } = params;
    if (!UPLOAD_DIR) {
      return {
        status: 500,
        message: "WIBU_UPLOAD_DIR is not defined",
        data: null,
      };
    }
    if (!name) {
      return {
        status: 400,
        message: "Name is required",
        data: null,
      };
    }
    const config = await fs.readFile(
      `${UPLOAD_DIR}/config/${name}.yml`,
      "utf-8"
    );
    return {
      status: 200,
      data: yml.parse(config),
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal Server Error",
      data: null,
    };
  }
}

export default configJson;
