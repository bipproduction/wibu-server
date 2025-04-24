import { prisma } from "@/lib/prisma";
import { Context } from "elysia";

export async function environtmentFindManyInclude(con: Context) {
  const { projectId } = con.params;
  const project = await prisma.projectEnvironment.findMany({
    where: { projectId },
    include: { env: true, config: true },
  });
  return { data: project };
}