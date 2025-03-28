import fs from "fs/promises";
import path from "path";

async function projectReleases({
  params,
}: {
  params: { name: string; namespace: string };
}) {
  try {
    const root = "/var/www/projects";
    const project = (
      await fs.readdir(
        path.join(root, params.name, params.namespace, "releases")
      )
    ).filter((file) => file !== ".DS_Store");
    const currentLink = await fs.readlink(
      path.join(root, params.name, params.namespace, "current")
    );
    const current = currentLink.split("/").pop();
    return { project, current };
  } catch (error) {
    console.error(error);
    return { project: [], current: null };
  }
}

export default projectReleases;
