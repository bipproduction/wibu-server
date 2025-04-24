import { prisma } from "@/lib/prisma";
import { Context } from "elysia";

async function projectDeleteHard(c: Context) {
  const { id } = c.params;
  const trx = await prisma.$transaction(async (tx) => {
    const project = await tx.projects.delete({
      where: {
        id: id,
      },
    });

    return { project };
  });

  return {
    success: true,
    message: "Project deleted",
    data: trx,
  };
}

export default projectDeleteHard;
