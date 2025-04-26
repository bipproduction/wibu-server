import { prisma } from "@/lib/prisma";
import { Context } from "elysia";

const projectEnvironmentFindMany = async (context: Context) => {
  const { projectId } = context.query;
  const data = await prisma.projectEnvironment.findMany({
    where: {
      projectId,
    },
  });
  return {
    data,
  };
};

export default projectEnvironmentFindMany;