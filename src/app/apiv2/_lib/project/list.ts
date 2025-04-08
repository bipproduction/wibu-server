import { prisma } from "@/lib/prisma";
import { Context } from "elysia";

export async function projectList(c: Context) {
  const page = c.query.page || "1";
  const per_page = c.query.per_page || "10";
  const projects = await prisma.projects.findMany({
    skip: (Number(page) - 1) * Number(per_page),
    take: Number(per_page),
  });
  return { data: projects };
}
