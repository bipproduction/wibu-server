import { prisma } from "@/lib/prisma";
import { Context } from "elysia";

const repoFindUniq = async (context: Context) => {
  const { repoId } = context.query;
  const data = await prisma.repos.findUnique({
    where: {
      id: repoId,
    },
  });
  return {
    data,
  };
};

export default repoFindUniq;
