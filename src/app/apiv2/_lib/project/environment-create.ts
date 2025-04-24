import { prisma } from "@/lib/prisma";
import processConfigGenerator from "../utils/process-config-generator";

interface ProjectCreateInput {
  body: {
    projectId: string;
    environment: { name: string; branch: string };
    env: { key: string; value: string }[];
    instance: number;
    previewUrl: string | null;
  };
}

export async function environmentCreate({ body }: ProjectCreateInput) {
  console.log("[environmentCreate] Start creating environment");

  const { projectId, environment, env, instance, previewUrl } = body;

  const [excludePortList, project] = await Promise.all([
    prisma.config.findMany({ select: { ports: true } }),
    prisma.projects.findUnique({ where: { id: projectId }, include: {repos: true} }),
  ]);

  if (!project) {
    console.log("[environmentCreate] Project not found");
    return {
      success: false,
      message: "Project not found",
      data: null,
    };
  }

  const repo = project.repos;
  if (!repo) {
    console.log("[environmentCreate] Repo not found");
    return {
      success: false,
      message: "Repo not found",
      data: null,
    };
  }

  const excludePorts = excludePortList.flatMap((v) => v.ports).filter(Boolean) as number[];

  const envObject = env.reduce<Record<string, string>>((acc, { key, value }) => {
    acc[key] = value;
    return acc;
  }, {});

  console.log("[projectCreate] Generating process config...");
  const config = await processConfigGenerator({
    name: project.name,
    namespace: `${project.name}-${environment.name}`,
    count: instance,
    excludePorts,
    env: { NODE_ENV: "production", ...envObject },
    debug: true,
  });
  console.log("[projectCreate] Config generated");

  try {
    const result = await prisma.$transaction(async (tx) => {
      console.log("[projectCreate] Creating project environment");
      const projectEnv = await tx.projectEnvironment.create({
        data: {
          projectId: project.id,
          branch: environment.branch,
          name: environment.name,
          previewUrl
        },
      });

      console.log("[projectCreate] Inserting environment variables");
      await tx.env.create({
        data: {
          json: envObject,
          projectEnvironmentId: projectEnv.id,
        },
      })

      console.log("[projectCreate] Saving config");
      await tx.config.create({
        data: {
          json: config,
          projectEnvironmentId: projectEnv.id,
          instance,
          ports: config.apps?.map((app) => app.env.PORT) || [],
        },
      });

      console.log("[projectCreate] Project successfully created");
      return {
        success: true,
        message: "Project created",
        data: project,
      };
    });

    return result;
  } catch (error) {
    console.error("[projectCreate] Transaction failed:", (error as Error).message);
    return {
      success: false,
      message: (error as Error).message,
      data: null,
    };
  }
}
