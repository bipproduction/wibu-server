/* eslint-disable @typescript-eslint/no-unused-vars */
import { exec } from "child_process";
import { promisify } from "util";

const X = promisify(exec);

async function processList() {
  const { stdout } = await X("pm2 jlist 2>&1");
  const data = stdout.toString();
  const match = data.match("[[^{]*({.*})]");
  const newData = match ? match[1] : "[]";
  try {

    return {
      data: newData,
    };
  } catch (error) {
    return {
      data: [],
    };
  }
}

export default processList;
