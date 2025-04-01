import { exec } from "child_process";
import { promisify } from "util";
const EX = promisify(exec);
export async function serverReload() {
  try {
    await EX("nginx -s reload");
    return {
      message: "Server reloaded successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Server reload failed",
    };
  }
}
