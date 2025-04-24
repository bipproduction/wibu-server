import { Context } from "elysia";
import { prisma } from "@/lib/prisma";

async function repoGet(context: Context) {
  const { projectId } = context.query;

  const project = await prisma.projects.findUnique({
    where: {
      id: projectId,
    },
    select: {
      repos: true,
    },
  });

  if (!project) {
    return { data: null };
  }

  return { data: project.repos };
}

export default repoGet;
