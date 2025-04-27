import { prisma } from "@/lib/prisma";
import { Context } from "vm";
import { TypeApiConfigFindMany } from ".";

const configFindMany = async (context: Context) => {
  const { projectEnvironmentId }: TypeApiConfigFindMany = context.params;
  const data = await prisma.config.findMany({
    where: {
      projectEnvironmentId,
    },
  });
  return { data };
};

export default configFindMany;
