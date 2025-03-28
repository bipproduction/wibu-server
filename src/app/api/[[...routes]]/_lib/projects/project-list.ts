import fs from "fs/promises";

async function projectList() {
  const root = "/var/www/projects";
  const projects = (await fs.readdir(root)).filter(
    (file) => file !== ".DS_Store"
  );
  return projects;
}

export default projectList;
