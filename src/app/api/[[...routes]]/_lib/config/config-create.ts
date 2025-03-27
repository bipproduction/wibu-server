import fs from "fs/promises";
import _ from "lodash";

async function configCreate({
  body,
}: {
  body: { name: string; text: string };
}) {
  const { name, text } = body;
  const UPLOAD_DIR = process.env.WIBU_UPLOAD_DIR;
  if (!UPLOAD_DIR) {
    throw new Error("WIBU_UPLOAD_DIR is not defined");
  }
  if (!name || !text) {
    return {
      status: 400,
      body: {
        message: "Name and text are required",
      },
    };
  }

  await fs.mkdir(`${UPLOAD_DIR}/config`, { recursive: true });
  const fileBuffer = Buffer.from(text);
  await fs.writeFile(`${UPLOAD_DIR}/config/${_.kebabCase(name)}.yml`, fileBuffer);
  return {
    status: 200,
    body: {
      message: "Config created successfully",
    },
  };
}

export default configCreate;
