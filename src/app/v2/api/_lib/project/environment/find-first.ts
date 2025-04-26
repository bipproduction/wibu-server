import { prisma } from "@/lib/prisma";
import { Context } from "elysia";

const projectEnvironmentFindFirst = async (context: Context) => {
  const { projectId, name } = context.query;
  const data = await prisma.projectEnvironment.findFirst({
    where: {
      projectId,
      name,
    },
  });
  return {
    data,
  };
};

export default projectEnvironmentFindFirst;
