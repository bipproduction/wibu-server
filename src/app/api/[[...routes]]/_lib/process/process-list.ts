/* eslint-disable @typescript-eslint/no-explicit-any */
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function processList(): Promise<{ data: any[] }> {
  try {
    const { stdout, stderr } = await execAsync("pm2 jlist", { maxBuffer: 1024 * 1024 }); // 1MB buffer
    if (stderr && stderr.trim().length > 0) {
      console.warn("PM2 jlist stderr:", stderr);
    }
    const parsedData = JSON.parse(stdout);
    return { data: Array.isArray(parsedData) ? parsedData : [] };
  } catch (error) {
    console.error("Error in processList:", error);
    return { data: [] };
  }
}

export default processList;