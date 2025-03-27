import { exec } from "child_process";
import { promisify } from "util";
const X = promisify(exec);
async function processRestart(params: { namespace: string }) {
  const { namespace } = params;
  if (!namespace) return "Namespace is required";
  const { stdout } = await X(`pm2 restart ${namespace}`);
  return stdout;
}

export default processRestart;
