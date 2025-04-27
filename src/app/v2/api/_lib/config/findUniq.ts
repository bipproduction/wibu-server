import { Context } from "vm";
import { prisma } from "@/lib/prisma";
import { TypeApiConfigFindUnique } from ".";

const configFindUniq = async (context: Context) => {
  const { projectEnvironmentId } = context.query as TypeApiConfigFindUnique;
  const data = await prisma.config.findUnique({
    where: {
      projectEnvironmentId,
    },
  });
  return {
    data,
  };
};

export default configFindUniq;
