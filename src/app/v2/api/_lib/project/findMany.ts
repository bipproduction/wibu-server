import { Context } from "elysia";
import { prisma } from "@/lib/prisma";

async function projectFindMany(context: Context) {
  const { q = "", page = 1, per_page = 10 } = context.query;
  const data = await prisma.projects.findMany({
    where: {
      name: {
        contains: q,
      },
    },
    skip: (Number(page) - 1) * Number(per_page),
    take: Number(per_page),
  });

  const count = await prisma.projects.count({
    where: {
      name: {
        contains: q,
      },
    },
  });
  return {
    data,
    count,
    page,
    per_page,
  };
}

export default projectFindMany;
