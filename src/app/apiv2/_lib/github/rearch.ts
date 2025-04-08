import { Context } from "elysia";
import { prisma } from "@/lib/prisma";

export async function reposSearch(c: Context) {
  const { q = "", page = 1, per_page = 10 } = c.params;

  const data = await prisma.repos.findMany({
    where: {
      name: {
        contains: q,
      },
    },
    skip: (Number(page) - 1) * Number(per_page),
    take: Number(per_page),
  });
  return {
    success: true,
    data,
  };
}
