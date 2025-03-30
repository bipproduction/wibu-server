/* eslint-disable @typescript-eslint/no-explicit-any */
import { exec } from "child_process";
import { promisify } from "util";
const EXEC = promisify(exec);
import fs from "fs/promises";

export async function buildLog({
  body,
  headers,
}: {
  body: any;
  headers: { "x-api-key": string; "x-api-path": string };
}) {
  const text = body.toString();
  const key = headers["x-api-key"];
  const xpath = headers["x-api-path"];

  if (key !== "makuro") {
    return {
      message: "Unauthorized",
    };
  }

  try {
    const dir = `/var/www/projects/${xpath}`;
    await fs.mkdir(`${dir}`, { recursive: true }).catch(() => {});
    await EXEC(`echo "" > ${dir}/build_log.txt`);
    await EXEC(
      `echo "[LOG] $(date +'%Y-%m-%d %H:%M:%S')" >> ${dir}/build_log.txt`
    );
    await EXEC(`echo "${text}" >> ${dir}/build_log.txt`);

    return {
      message: "success",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "error",
    };
  }
}

export default buildLog;
