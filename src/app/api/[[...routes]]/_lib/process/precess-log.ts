/* eslint-disable @typescript-eslint/no-explicit-any */
import { spawn } from "child_process";

const decoder = new TextDecoder("utf-8");
async function processLog({
  params,
  set,
}: {
  params: { name: string; lines: number };
  set: any;
}) {
  set.headers["Content-Type"] = "text/plain";
  return await new Promise((resolve) => {
    let data = "";
    const child = spawn(
      "/bin/bash",
      ["-c", `pm2 logs ${params.name} --lines ${params.lines ?? 15}`],
      {
        stdio: "pipe",
        env: process.env,
      }
    );
    child.stdout.on("data", (chunk) => {
      data += decoder.decode(chunk);
    });
    setTimeout(() => {
      child.kill();
      resolve(data);
      console.log(data);
    }, 10000);
  });
}

export default processLog;
