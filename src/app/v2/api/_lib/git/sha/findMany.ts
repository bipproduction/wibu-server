import { Context } from "elysia";
import { prisma } from "@/lib/prisma";

const gitShaFindMany = async (context: Context) => {
  const { repoId, branchId, page = 1, per_page = 10 } = context.query;

  const repo = await prisma.sha.findMany({
    where: {
      repoId,
      branchId,
    },
    skip: (Number(page) - 1) * Number(per_page),
    take: Number(per_page),
    orderBy: {
      createdAt: "asc",
    },
  });

  return { data: repo };
};

export default gitShaFindMany;

