import { Context } from "elysia";
import { prisma } from "@/lib/prisma";
import { v2Octokit, options } from "@/app/v2/_lib/v2-ocktokit";

const gitBranchSync = async (context: Context) => {
  const { repoId } = context.query;
  const perPage = 100;
  let page = 1;
  const allBranches: string[] = [];

  const repo = await prisma.repos.findUnique({
    where: {
      id: repoId,
    },
  });

  if (!repo) {
    return { data: 0 };
  }

  while (true) {
    const response = await v2Octokit.rest.repos.listBranches({
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

  return {
    data: allBranches.length,
  };
};

export default gitBranchSync;
