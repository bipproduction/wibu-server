import { prisma } from "@/lib/prisma";
import { Context } from "elysia";

async function branchList(context: Context) {
  const { projectId, page = 1, per_page = 10 } = context.query;
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

  try {
    const branches = await prisma.branches.findMany({
      skip: (Number(page) - 1) * Number(per_page),
      take: Number(per_page),
      where: {
        repoId: project.repos.id,
      },
    });
    return { data: branches };
  } catch (error) {
    console.error(error);
    return { data: [] };
  }
}

export default branchList;
