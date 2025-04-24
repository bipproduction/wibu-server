import { Context } from "elysia";
import { octokit, options } from "../bin/okto";
import { prisma } from "@/lib/prisma";

async function fetchAllBranches(context: Context) {
  const { projectId } = context.query;
  const perPage = 100;
  let page = 1;
  const allBranches: string[] = [];

  const project = await prisma.projects.findUnique({
    where: {
      id: projectId,
    },
    select: {
      repos: true,
    },
  });

  if (!project || !project.repos) {
    return { data: [] };
  }

  const repo = project.repos;

  while (true) {
    const response = await octokit.rest.repos.listBranches({
      owner: options.owner,
      repo: repo.name,
      headers: options.headers,
      per_page: perPage,
      page,
    });

    const branches = response.data.map((branch) => branch.name);
    allBranches.push(...branches);

    if (branches.length < perPage) break; // berarti sudah halaman terakhir
    page++;
  }

  // upsert
  for (const branch of allBranches) {
    await prisma.branches.upsert({
      where: {
        id: `${repo.id}-${branch}`,
      },
      update: {
        name: branch,
        repoId: repo.id,
      },
      create: {
        id: `${repo.id}-${branch}`,
        name: branch,
        repoId: repo.id,
      },
    });
  }

  console.log(`Successfully synced ${allBranches.length} branches`);

  return {
    data: allBranches,
  };
}

export default fetchAllBranches;
