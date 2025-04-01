/* eslint-disable @typescript-eslint/no-explicit-any */
import { exec } from "child_process";
import { promisify } from "util";
const EXEC = promisify(exec);
import fs from "fs/promises";

export async function buildLog({ body }: { body: any }) {
  try {
    const text = body;
    const dir = `/var/www/projects/${text.path}`;
    await fs.mkdir(`${dir}`, { recursive: true }).catch(() => {});
    await EXEC(`echo "" > ${dir}/build_log.txt`);
    await EXEC(
      `echo "[LOG] $(date +'%Y-%m-%d %H:%M:%S')" >> ${dir}/build_log.txt`
    );
    await EXEC(`echo "${text.log}" >> ${dir}/build_log.txt`);

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
