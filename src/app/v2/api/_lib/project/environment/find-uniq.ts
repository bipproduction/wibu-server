import { prisma } from "@/lib/prisma";
import { Context } from "elysia";

const projectEnvironmentFindUniq = async (context: Context) => {
  const { id } = context.query;
  const data = await prisma.projectEnvironment.findUnique({
    where: {
      id,
    },
  });
  return {
    data,
  };
};

export default projectEnvironmentFindUniq;