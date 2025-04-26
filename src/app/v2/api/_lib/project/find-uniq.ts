import { prisma } from "@/lib/prisma";
import { Context } from "elysia";

const projectFindUniq = async (context: Context) => {
  const { projectId } = context.query;
  const data = await prisma.projects.findUnique({
    where: {
      id: projectId,
    },
    include: {
      repos: {
        select: {
          html_url: true,
        },
      },
    },
  });
  return {
    data,
  };
};

export default projectFindUniq;
