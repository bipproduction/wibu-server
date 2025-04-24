import { prisma } from "@/lib/prisma";
import { Context } from "elysia";

async function branchSearch(context: Context) {
  const {  projectId, q, page, per_page } = context.query;

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

  const branches = await prisma.branches.findMany({
    skip: (Number(page) - 1) * Number(per_page),
    take: Number(per_page),
    where: {
      repoId: project.repos.id,
      name: {
        contains: q,
      },
    },
  });
  return { data: branches };
}

export default branchSearch;
