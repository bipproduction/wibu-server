/* eslint-disable @typescript-eslint/no-explicit-any */
import { exec } from "child_process";
import { promisify } from "util";

// Tipe untuk hasil
interface ProcessListResult {
  data: any[]; // Ganti any dengan tipe spesifik dari PM2 jika ada
}

const execAsync = promisify(exec);

async function processList(): Promise<ProcessListResult> {
  try {
    const { stdout, stderr } = await execAsync("pm2 jlist");

    // Periksa stderr untuk error
    if (stderr && stderr.trim().length > 0) {
      console.warn("PM2 jlist stderr:", stderr);
    }

    // Langsung parse stdout karena pm2 jlist mengembalikan JSON
    const parsedData = JSON.parse(stdout);
    return {
      data: Array.isArray(parsedData) ? parsedData : [],
    };
  } catch (error) {
    console.error("Error in processList:", error);
    return {
      data: [],
    };
  }
}

export default processList;