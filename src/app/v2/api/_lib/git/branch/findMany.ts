import { prisma } from "@/lib/prisma";
import { Context } from "elysia";

const gitBranchFindMany = async (context: Context) => {
  const { repoId, q, page, per_page } = context.query;

  const repo = await prisma.branches.findMany({
    where: {
      repoId,
      name: {
        contains: q,
      },
    },
    skip: (Number(page) - 1) * Number(per_page),
    take: Number(per_page),
  });

  const count = await prisma.branches.count({
    where: {
      repoId,
    },
  });
  return {
    data: repo,
    count,
    page,
    per_page,
  };
};

export default gitBranchFindMany;
