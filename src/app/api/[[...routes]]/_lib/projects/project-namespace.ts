import fs from "fs/promises";
import path from "path";

async function projectNamespace({ params }: { params: { name: string } }) {
  const root = "/var/www/projects";
  const project = (await fs.readdir(path.join(root, params.name))).filter(
    (file) => file !== ".DS_Store" 
  );
  return project;
}

export default projectNamespace;
