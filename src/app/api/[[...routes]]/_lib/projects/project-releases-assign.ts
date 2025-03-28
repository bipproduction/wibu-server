import path from "path";
import fs from "fs/promises";
import { exec } from "child_process";
import { promisify } from "util";
const X = promisify(exec);

async function projectReleasesAssign({
  params,
}: {
  params: { name: string; namespace: string; release: string };
}) {
  try {
    const root = "/var/www/projects";
    const project = path.join(
      root,
      params.name,
      params.namespace,
      "releases",
      params.release
    );
    const current = path.join(root, params.name, params.namespace, "current");
    await fs.rm(current, { recursive: true, force: true });
    await fs.symlink(project, current);
    await X(`pm2 restart ${params.namespace} && nginx -s reload`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export default projectReleasesAssign;
