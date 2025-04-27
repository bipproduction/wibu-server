import { prisma } from "@/lib/prisma";
import { Context } from "elysia";
import { TypeApiEnvironmentFindUnique } from ".";

const projectEnvironmentFindUniq = async (context: Context) => {
  const { environmentId } = context.query as TypeApiEnvironmentFindUnique;
  const data = await prisma.projectEnvironment.findUnique({
    where: {
      id: environmentId,
    },
  });
  return {
    data,
  };
};

export default projectEnvironmentFindUniq;