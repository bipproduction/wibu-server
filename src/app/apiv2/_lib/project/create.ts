import { prisma } from "@/lib/prisma";
import processConfigGenerator from "../utils/process-config-generator";

interface ProjectCreateInput {
  body: {
    name: string;
    full_name: string;
    environment: { name: string; branch: string };
    env: Record<string, string>;
    instance: number;
    push: boolean;
    seed: boolean;
    build: boolean;
    previewUrl: string | null;
  };
}

export async function projectCreate({ body }: ProjectCreateInput) {
  console.log("[projectCreate] Start creating project");

  const { name, full_name, environment, env, instance, push, seed, build, previewUrl } = body;

  // Validation
  if (!name || !full_name) {
    console.log("[projectCreate] Missing required fields");
    return {
      success: false,
      message: "Project name and full name are required",
      data: null,
    };
  }

  const [repo, existingProject, excludePortList] = await Promise.all([
    prisma.repos.findUnique({ where: { full_name } }),
    prisma.projects.findUnique({ where: { name } }),
    prisma.config.findMany({ select: { ports: true } }),
  ]);

  if (existingProject) {
    console.log("[projectCreate] Project already exists");
    return {
      success: false,
      message: "Project already exists",
      data: null,
    };
  }

  if (!repo) {
    console.log("[projectCreate] Repo not found");
    return {
      success: false,
      message: "Repo not found",
      data: null,
    };
  }

  const excludePorts = excludePortList.flatMap((v) => v.ports).filter(Boolean) as number[];

  console.log("[projectCreate] Generating process config...");
  const config = await processConfigGenerator({
    name,
    namespace: `${name}-${environment.name}`,
    count: instance,
    excludePorts,
    env: { NODE_ENV: "production", ...env },
    debug: true,
  });
  console.log("[projectCreate] Config generated");

  try {
    const result = await prisma.$transaction(async (tx) => {
      console.log("[projectCreate] Creating project record");
      const project = await tx.projects.create({
        data: {
          name,
          description: "",
          full_name,
          push,
          seed,
          build,
          reposId: repo.id,
        },
      });

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
          json: env,
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
