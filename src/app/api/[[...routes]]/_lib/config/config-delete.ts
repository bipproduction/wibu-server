import { exec } from "child_process";
import { promisify } from 'util';
const ECEX = promisify(exec);

const UPLOAD_DIR = process.env.WIBU_UPLOAD_DIR;

if (!UPLOAD_DIR) {
  throw new Error("WIBU_UPLOAD_DIR is not defined");
}

async function configDelete({params}: {params: { name: string }}) {

  const { name } = params;
  console.log("[INFO] name",name);
  if (!name) {
    return {
      status: 400,
      body: {
        message: "Name is required",
      },
    };
  }
  if (!UPLOAD_DIR) {
    return {
      status: 500,
      body: {
        message: "WIBU_UPLOAD_DIR is not defined",
      },
    };
  }
  // await fs.unlink(`${UPLOAD_DIR}/config/${name}.yml`);
  await ECEX(`rm -rf ${UPLOAD_DIR}/config/${name}.yml`);
  console.log(`File deleted successfully: ${UPLOAD_DIR}/config/${name}.yml`);
  return {
    status: 200,
    body: {
      message: "File deleted successfully",
    },
  };
}

export default configDelete;