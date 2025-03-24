import fs from "fs/promises";

const UPLOAD_DIR = process.env.WIBU_UPLOAD_DIR;

async function configUpload({ body }: { body: { file: File, name: string } }) {
  if (!UPLOAD_DIR) {
    throw new Error("WIBU_UPLOAD_DIR is not defined");
  }

  if(!body.name || !body.file) {
    return {
      status: 400,
      body: {
        message: "Name and file are required",
      },
    };
  }
  await fs.mkdir(`${UPLOAD_DIR}/config`, { recursive: true });

  const fileBuffer = Buffer.from(await body.file.arrayBuffer());
  await fs.writeFile(`${UPLOAD_DIR}/config/${body.name}.yml`, fileBuffer);
  return {
    status: 200,
    body: {
      message: "File uploaded successfully",
    },
  };
}

export default configUpload;
