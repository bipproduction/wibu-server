import { prisma } from "@/lib/prisma";
import { Context } from "elysia";

export async function getProject(con: Context) {
  const { id } = con.params;
  const project = await prisma.projects.findUnique({
    where: { id }
  });
  return { data: project };
}
