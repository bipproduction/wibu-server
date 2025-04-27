import { prisma } from "@/lib/prisma";
import { Context } from "elysia";
import { TypeApiEnvironmentFindFirst } from ".";

const projectEnvironmentFindFirst = async (context: Context) => {
  const { projectId, name } = context.query as TypeApiEnvironmentFindFirst;
  const data = await prisma.projectEnvironment.findFirst({
    where: {
      projectId,
      name,
    },
    include: {
      config: true,
      env: true,
    },
  });
  return {
    data,
  };
};

export default projectEnvironmentFindFirst;
