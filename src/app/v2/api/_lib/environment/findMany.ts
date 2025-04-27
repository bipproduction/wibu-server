import { prisma } from "@/lib/prisma";
import { Context } from "elysia";
import { TypeApiEnvironmentFindMany } from ".";

const projectEnvironmentFindMany = async (context: Context) => {
  const { projectId } = context.query as TypeApiEnvironmentFindMany;
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