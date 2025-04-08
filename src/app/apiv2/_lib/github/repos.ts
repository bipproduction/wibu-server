import { Context } from "elysia";
import { prisma } from "@/lib/prisma";

export async function reposList(c: Context) {
  const page = c.params.page || "1";
  const per_page = c.params.per_page || "10";
  const data = await prisma.repos.findMany({
    skip: (Number(page) - 1) * Number(per_page),
    take: Number(per_page),
  });
  return {
    success: true,
    data,
  };
}
