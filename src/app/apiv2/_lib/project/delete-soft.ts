import { prisma } from "@/lib/prisma";
import { Context } from "elysia";

async function projectDeleteSoft(c: Context) {
  const { id } = c.params;

  const now = new Date();

  const trx = await prisma.$transaction(async (tx) => {
    // Soft delete Project
    const project = await tx.projects.update({
      where: { id },
      data: {
        isActive: false,
        deletedAt: now,
      },
    });

    // Cari semua ProjectEnvironment dari project tersebut
    const environments = await tx.projectEnvironment.findMany({
      where: { projectId: id },
      select: { id: true },
    });

    const envIds = environments.map((env) => env.id);

    // Soft delete semua ProjectEnvironment
    await tx.projectEnvironment.updateMany({
      where: { projectId: id },
      data: {
        deletedAt: now,
        isActive: false,
      },
    });

    // Soft delete semua Config
    await tx.config.updateMany({
      where: {
        projectEnvironmentId: { in: envIds },
      },
      data: {
        deletedAt: now,
        isActive: false,
      },
    });

    // Soft delete semua Env
    await tx.env.updateMany({
      where: {
        projectEnvironmentId: { in: envIds },
      },
      data: {
        deletedAt: now,
        isActive: false,
      },
    });

    return { project };
  });

  return {
    success: true,
    message: "Project soft-deleted beserta semua turunannya",
    data: trx,
  };
}

export default projectDeleteSoft;
