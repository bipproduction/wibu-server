import { prisma } from "@/lib/prisma";
import { ProjectCreateBody } from ".";

export async function projectCreate({ body }: { body: ProjectCreateBody }) {
  const repo = await prisma.repos.findUnique({
    where: {
      full_name: body.full_name,
    },
  });

  if (!repo) {
    return {
      success: false,
      message: "Repo not found",
    };
  }

  try {
    await prisma.projects.create({
      data: {
        name: body.name,
        description: "",
        full_name: body.full_name,
        push: body.push,
        seed: body.seed,
        build: body.build,
        reposId: repo.id,
      },
    });

    return {
      success: true,
      message: "Project created",
    };
  } catch (error) {
    console.error((error as Error).message);
    return {
      success: false,
      message: `nama ${body.name}  telah terdaftar`,
    };
  }
}
