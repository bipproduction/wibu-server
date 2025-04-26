import { prisma } from "@/lib/prisma";
import { Context } from "elysia";

const repoFindMany = async (context: Context) => {
  const { q = "", page = 1, per_page = 10 } = context.query;
  const data = await prisma.repos.findMany({
    where: {
      name: {
        contains: q,
      },
    },
    skip: (Number(page) - 1) * Number(per_page),
    take: Number(per_page),
    include: {
      _count: {
        select: {
          Branches: true,
        },
      },
    },
  });

  const count = await prisma.repos.count();
  return {
    data,
    count,
    page,
    per_page,
  };
};

export default repoFindMany;
